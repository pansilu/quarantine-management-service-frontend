import { Component, OnInit, ViewChild, ElementRef, NgZone, Output, Input, EventEmitter, SimpleChanges, OnChanges, Directive } from '@angular/core';
import { MapsAPILoader, MouseEvent, AgmMap, AgmDataLayer } from '@agm/core';
import { AddressModel } from '../../models/address.model';
import { QuarantineService } from 'src/app/Service/quarantine.service';
import { ToastService } from 'src/app/Service/toast.service';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';
import * as GeoJsonGeometriesLookup from 'geojson-geometries-lookup';


@Component({
  selector: 'app-address-search-map',
  templateUrl: './address-search-map.component.html',
  styleUrls: ['./address-search-map.component.scss']
})
export class AddressSearchMapComponent implements OnInit, OnChanges {
  @Output('address_out') addressEmit: EventEmitter<AddressModel> = new EventEmitter<AddressModel>();
  @Input('address') address: AddressModel
  @Input('gnd') gnd !: number

  Json: any = {
    "type": "FeatureCollection",
    "features": []
  }


  enable: boolean = false;
  zoom: number = 7;
  baseLat: number
  baseLng: number
  initaddress: string
  addresEnterDisabled: boolean = true;
  private geoCoder;
  private _autocompleteService;
  lookup: any

  // second method
  addresses: Array<AddressModel>;
  addressKeyword = 'line';

  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _quarantineService: QuarantineService,
    private _toast: ToastService,
    private _errorHandlerService: ErrorHandlerService
  ) { }


  ngOnInit() {
    // this.Json.features = [this.feature];
    this.initaddress = this.address.line;
    if (this.address.id > 0) {
      this.setCurrentLocation();
      this.addresEnterDisabled = false;
    }
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      this._autocompleteService = new google.maps.places.AutocompleteService();
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, { componentRestrictions: { country: "lk" } });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          var pass = this.checkCoordinateWithingTheSelectedArea(place.geometry.location.lng(), place.geometry.location.lat());
          if (pass) {
            //set latitude, longitude and zoom
            this.address.lat = place.geometry.location.lat();
            this.address.lon = place.geometry.location.lng();
            // this.address.line = this.searchElementRef.nativeElement.value;
            this.zoom = 16;
            this.addressEmit.emit(this.address);
          }
        });
      });
    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    this.getGndById(this.address.gndId, false);
    this.baseLat = this.address.lat;
    this.baseLng = this.address.lon;
    this.gnd = this.address.gndId;
    this.zoom = 16;
  }

  styleFunc(feature) {
    return ({
      clickable: false,
      fillColor: feature.getProperty('color'),
      strokeWeight: 1
    });
  }

  // [markerDraggable]="true"
  // (dragEnd)="markerDragEnd($event)"
  // markerDragEnd($event: MouseEvent) {
  //   // console.log($event);
  //   var pass = this.checkCoordinateWithingTheSelectedArea($event.coords.lng, $event.coords.lat)
  //   console.log(pass);
  //   if (pass) {
  //     this.address.lat = $event.coords.lat;
  //     this.address.lon = $event.coords.lng;
  //   }
  //   else {
  //     this.address.lat = this.baseLat;
  //     this.address.lon = this.baseLng;
  //   }
  //   this.addressEmit.emit(this.address);
  // }

  onMapClick($event) {
    var pass = this.checkCoordinateWithingTheSelectedArea($event.coords.lng, $event.coords.lat)
    if (pass) {
      this.address.lat = $event.coords.lat;
      this.address.lon = $event.coords.lng;
      this.addressEmit.emit(this.address);
    }
    else {
      // do nothing
    }
  }

  checkCoordinateWithingTheSelectedArea(lng, lat) {
    const point = { type: "Point", coordinates: [lng, lat] };
    if (this.lookup) {
      return this.lookup.hasContainers(point, { ignorePoints: true, ignoreLines: true });
    }
    else {
      return true;
    }
  }

  getAddress(address: string) {
    if (address === '' || address === null)
      return
    var request = {
      input: address,
      componentRestrictions: { country: 'lk' },
    };
    this._autocompleteService.getPlacePredictions(request, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.geoCoder.geocode({ 'placeId': results[0].place_id }, (responses, status) => {
            if (status === 'OK') {
              if (responses[0]) {
                var pass = false
                for (let e of responses) {
                  pass = this.checkCoordinateWithingTheSelectedArea(e.geometry.location.lng(), e.geometry.location.lat());
                  console.log(pass)
                  if (pass) {
                    this.address.lat = responses[0].geometry.location.lat();
                    this.address.lon = responses[0].geometry.location.lng();
                    this.zoom = 16;
                    this.addressEmit.emit(this.address)
                    return;
                  }
                }

                if (!pass) {
                  this.setPoitsToDef();
                }
              }
              else {
                this.setPoitsToDef();
              }
            }
            else {
              this.setPoitsToDef();
            }
          })
        } else {
          // window.alert('No results found');
          this.setPoitsToDef();
        }
      } else {
        // window.alert('Geocoder failed due to: ' + status);
        this.setPoitsToDef();
      }

    });
  }

  getGndById(id: number, center?: boolean) {
    this._quarantineService.getGndById(d => {
      var object = JSON.parse(d.feature)
      this.Json.features = [object]
      this.lookup = new GeoJsonGeometriesLookup(this.Json);
      //Calculate marker point
      this.enable = true;
      if (center) {
        this.calCenterOfPoliline();
      }
    },
      e => {
        this._errorHandlerService.Handler(e);
      }, id)
  }

  calCenterOfPoliline() {
    if (this.Json.features[0].geometry.geometries) {
      // console.log("array");
      var avg = (this.Json.features[0].geometry.geometries[0].coordinates[0].length - 1) / 4
      var Q_1 = this.Json.features[0].geometry.geometries[0].coordinates[0][Math.floor(avg)]
      var Q_2 = this.Json.features[0].geometry.geometries[0].coordinates[0][Math.floor(avg) * 2]
      var Q_3 = this.Json.features[0].geometry.geometries[0].coordinates[0][Math.floor(avg) * 3]
      var Q_4 = this.Json.features[0].geometry.geometries[0].coordinates[0][Math.floor(avg) * 4]
      var lon = (Q_1[0] + Q_2[0] + Q_3[0] + Q_4[0]) / 4
      var lat = (Q_1[1] + Q_2[1] + Q_3[1] + Q_4[1]) / 4

      this.address.lat = lat;
      this.address.lon = lon;
      this.baseLat = lat;
      this.baseLng = lon;
      this.zoom = 16;
    }
    else {
      // console.log("normal object");
      var avg = (this.Json.features[0].geometry.coordinates[0].length - 1) / 4

      var Q_1 = this.Json.features[0].geometry.coordinates[0][Math.floor(avg)]
      var Q_2 = this.Json.features[0].geometry.coordinates[0][Math.floor(avg) * 2]
      var Q_3 = this.Json.features[0].geometry.coordinates[0][Math.floor(avg) * 3]
      var Q_4 = this.Json.features[0].geometry.coordinates[0][Math.floor(avg) * 4]


      var lon = (Q_1[0] + Q_2[0] + Q_3[0] + Q_4[0]) / 4
      var lat = (Q_1[1] + Q_2[1] + Q_3[1] + Q_4[1]) / 4

      this.address.lat = lat;
      this.address.lon = lon;
      this.baseLat = lat;
      this.baseLng = lon;
      this.zoom = 16;
    }
  }

  setPoitsToDef() {
    this.address.lat = this.baseLat;
    this.address.lon = this.baseLng;
    this.addressEmit.emit(this.address)
    this.zoom = 15;
  }

  onAddressChange($event) {
    this.addressEmit.emit(this.address)
  }

  // get address form back end if not get address from google

  onChangeSearchAddress(search: string) {
    this.address.id = null;
    this.address.line = search;
    this._quarantineService.getAddresses((d) => {
      this.addresses = d;
    }, e => {
      this._errorHandlerService.Handler(e);
    }, this.gnd, search);

    this.getAddress(this.getFullAddress());

  }

  selectEventAddress(item: AddressModel) {
    // console.log(item)
    // address is alredy in out database
    this.address.id = item.id
    this.address.gndId = item.gndId
    this.address.lat = +item.lat
    this.address.line = item.line
    this.address.lon = +item.lon
    this.address.policeArea = item.policeArea
    this.address.town = item.town
    this.address.village = item.village
    this.addressEmit.emit(this.address)
  }

  onFocusedAddress(e) {
  }

  onPoliceAreaChange() {
    if (this.address.policeArea != "") {
      this.addressEmit.emit(this.address);
    }
    else {
      this.address.policeArea = null;
      this.addressEmit.emit(this.address)
    }
  }

  onTownChange() {
    this.address.id = null;
    if (this.address.town != "") {

      this.getAddress(this.getFullAddress());
      // this.addressEmit.emit(this.address);
    }
    else {
      this.address.town = null;
      this.addressEmit.emit(this.address)
    }

  }

  getFullAddress() {
    var line = this.address.line === undefined ? "" : this.address.line
    var village = this.address.village === undefined ? "" : this.address.village
    var town = this.address.town === undefined ? "" : this.address.town
    return (line + " " + village + " " + town);
  }

  onVillageChange() {
    this.address.id = null;
    if (this.address.village != "") {
      this.getAddress(this.getFullAddress());
      // this.addressEmit.emit(this.address);
    }
    else {
      this.address.village = null;
      this.addressEmit.emit(this.address)
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.gnd) {
      if (changes.gnd.previousValue !== changes.gnd.currentValue) {
        if (changes.gnd.currentValue !== 0 && changes.gnd.currentValue !== null) {
          this.enable = false;
          this.getGndById(changes.gnd.currentValue, true);
          this.addresEnterDisabled = false;
        }
      }
    }
    if (changes.address) {
      if (changes.address.previousValue) {
        if (changes.address.previousValue.line !== changes.address.currentValue.line) {
          this.zoom = 7;
          this.initaddress = changes.address.currentValue.line
        }

      }
    }
  }
}
