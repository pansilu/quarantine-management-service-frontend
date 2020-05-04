import { Component, OnInit, ViewChild, AfterContentInit, ChangeDetectorRef, Inject } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { DashboardService } from 'src/app/Service/dashboard.service';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';

@Component({
  selector: 'app-map-distribution',
  templateUrl: './map-distribution.component.html',
  styleUrls: ['./map-distribution.component.scss']
})

export class MapDistributionComponent implements OnInit, AfterContentInit {
  zoom: number = 8;
  enable: boolean = false;
  visible: boolean = false;
  infoLat: number = 7.723867;
  infoLon: number = 80.771878;
  districtName: string;

  GeoJson: any = {
    "type": "FeatureCollection",
    "features": []
  }

  scaledSize = {
    width: 5,
    height: 5
  }

  iconA = {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Location_dot_red.svg/64px-Location_dot_red.svg.png',
    scaledSize: this.scaledSize
  }

  iconC = {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Location_dot_green.svg/64px-Location_dot_green.svg.png',
    scaledSize: this.scaledSize
  }

  iconD = {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Location_dot_blue.svg/64px-Location_dot_blue.svg.png',
    scaledSize: this.scaledSize
  }

  constructor(
    private _dashboardService: DashboardService,
    private _errorHandlerService: ErrorHandlerService,
    @Inject(ChangeDetectorRef) private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadDistrictsIntoMap();
  }

  ngAfterContentInit() {
  }

  styleFunc(feature) {
    return ({
      clickable: true,
      fillColor: '#fff900',
      strokeWeight: .75,
      fillOpacity: .5,
      // strokeOpacity: 1,
      // strokeColor:'#d8d305'
    });
  }

  loadDistrictsIntoMap() {
    this._dashboardService.getDistrictsFeatures(d => {
      this.enable = false;
      // console.log(d);
      d.forEach(e => {
        var feture = JSON.parse(e.feature)
        feture.properties.id = e.id
        this.GeoJson.features.push(feture)
      })
      this.enable = true
    },
      e => {
        this._errorHandlerService.Handler(e);
      }
      , 1)
  }

  clicked(clickEvent) {
    // this.districtName = clickEvent.feature.getProperty("NAME_1")
    // console.log(clickEvent.feature.getProperty("id"));
    // this.infoLat = clickEvent.latLng.lat();
    // this.infoLon = clickEvent.latLng.lng();
    // this.visible = true;
  };

  onOpenChange($isOpen: boolean) {
    this.visible = $isOpen;
    this.changeDetectorRef.detectChanges();
  }

  clickedMarker(lat: number, lng: number, id: string) {
    this.infoLat = lat;
    this.infoLon = lng;
    this.visible = true;
    this.districtName = id;
  }

  setIconType(status: string) {
    var url: string = "";
    if (status == "compleat")
      return this.iconC
    else if (status == "ded")
      return this.iconD
    else if (status == "active")
      return this.iconA
  }

  markers: marker[] = [
    {
      lat: 6.647406,
      lng: 81.265137,
      id: 'A',
      status: "compleat"
    },
    {
      lat: 6.793491,
      lng: 81.383417,
      id: 'B',
      status: "ded"
    },
    {
      lat: 7.039378,
      lng: 81.322151,
      id: 'C',
      status: "active"
    }
  ]

}

interface marker {
  lat: number;
  lng: number;
  id: string;
  status: string;
}
