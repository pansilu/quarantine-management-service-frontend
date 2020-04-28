import { Component, OnInit, ViewChild, ElementRef, NgZone, Output, Input, EventEmitter, SimpleChanges, OnChanges, Directive } from '@angular/core';
import { MapsAPILoader, MouseEvent, AgmMap, AgmDataLayer } from '@agm/core';
import { AddressModel } from '../../models/address.model';
import { QuarantineService } from 'src/app/Service/quarantine.service';
import { ToastService } from 'src/app/Service/toast.service';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';

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
  private geoCoder;
  private _autocompleteService;
  baseLat: number
  baseLng: number
  initaddress: string

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
          //set latitude, longitude and zoom
          this.address.lat = place.geometry.location.lat();
          this.address.lon = place.geometry.location.lng();
          // this.address.line = this.searchElementRef.nativeElement.value;
          this.zoom = 16;
          this.addressEmit.emit(this.address);
        });
      });
    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    this.getGndById(this.address.gndId, false);
    this.zoom = 16;
  }

  styleFunc(feature) {
    return ({
      clickable: false,
      fillColor: feature.getProperty('color'),
      strokeWeight: 1
    });
  }


  markerDragEnd($event: MouseEvent) {
    // console.log($event);
    this.address.lat = $event.coords.lat;
    this.address.lon = $event.coords.lng;
    this.addressEmit.emit(this.address);
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
                this.address.lat = responses[0].geometry.location.lat();
                this.address.lon = responses[0].geometry.location.lng();
                this.zoom = 15;
                this.addressEmit.emit(this.address)
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

  // GetAddressByName(address: string) {
  //   this.geoCoder.geocode({ 'address': address }, (responses, status) => {
  //     if (status === 'OK') {
  //       if (responses[0]) {
  //         this.address.lat = responses[0].geometry.location.lat();
  //         this.address.lon = responses[0].geometry.location.lng();
  //         this.baseLat = responses[0].geometry.location.lat();
  //         this.baseLng = responses[0].geometry.location.lng();
  //         this.zoom = 14;
  //         // this.enable = true
  //         // this.addressEmit.emit(this.address)
  //       }
  //       else {
  //         this.setPoitsToDef();
  //       }
  //     }
  //     else {
  //       this.setPoitsToDef();
  //     }
  //   })
  // }

  getGndById(id: number, center?: boolean) {
    this._quarantineService.getGndById(d => {
      // console.log(d); 
      this.Json.features = [JSON.parse(d.feature)]
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
    var length = this.Json.features[0].geometry.coordinates[0].length
    var min = this.Json.features[0].geometry.coordinates[0][0]
    var max = this.Json.features[0].geometry.coordinates[0][Math.round(length / 2)]
    // console.log(min);
    // console.log(max);


    var lon = (min[0] + max[0]) / 2
    var lat = (min[1] + max[1]) / 2

    this.address.lat = lat;
    this.address.lon = lon;
    this.baseLat = lat;
    this.baseLng = lon;
    this.zoom = 16;

    // console.log(lat , lon);

  }

  setPoitsToDef() {
    this.address.lat = this.baseLat;
    this.address.lon = this.baseLng;
    this.addressEmit.emit(this.address)
    this.zoom = 14;
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

    this.getAddress(search);
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
    if (this.address.town != "") {
      this.addressEmit.emit(this.address);
    }
    else {
      this.address.town = null;
      this.addressEmit.emit(this.address)
    }

  }

  onVillageChange() {
    if (this.address.village != "") {
      this.addressEmit.emit(this.address);
    }
    else {
      this.address.village = null;
      this.addressEmit.emit(this.address)
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.gnd) {
      if (changes.gnd.previousValue !== changes.gnd.currentValue) {
        if (changes.gnd.currentValue !== 0) {
          this.enable = false;
          this.getGndById(changes.gnd.currentValue,true);
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
