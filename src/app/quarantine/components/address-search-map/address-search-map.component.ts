import { Component, OnInit, ViewChild, ElementRef, NgZone, Output, Input, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
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
  @Input('station') station !: string
  // address:AddressModel = new AddressModel();
  enable: boolean = true;
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
    this.initaddress = this.address.line;
    if (this.address.id > 0)
      this.zoom = 16;
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
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
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // this.latitude = position.coords.latitude;
        // this.longitude = position.coords.longitude;
        // this.zoom = 6;
        // this.getAddress(this.latitude, this.longitude);
      });
    }
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

  GetAddressByName(address: string) {
    this.geoCoder.geocode({ 'address': address }, (responses, status) => {
      if (status === 'OK') {
        if (responses[0]) {
          this.address.lat = responses[0].geometry.location.lat();
          this.address.lon = responses[0].geometry.location.lng();
          this.baseLat = responses[0].geometry.location.lat();
          this.baseLng = responses[0].geometry.location.lng();
          this.zoom = 14;
          // this.enable = true
          // this.addressEmit.emit(this.address)
        }
        else {
          this.setPoitsToDef();
        }
      }
      else {
        this.setPoitsToDef();
      }
    })
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
    }, search);

    this.getAddress(search);
  }

  selectEventAddress(item: AddressModel) {
    console.log(item)
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.station.previousValue !== changes.station.currentValue) {
      this.GetAddressByName(changes.station.currentValue);
    }
  }


}
