import { Component, OnInit, ViewChild, AfterContentInit, ChangeDetectorRef, Inject, Input, SimpleChanges, OnChanges } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { DashboardService } from 'src/app/Service/dashboard.service';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';
import { GraphDataRequestModel } from '../../models/graph-data-request.model';
import { MapDataRequestModel } from '../../models/map-data-request.model';
import QuarantineUserStatus from '../../models/QuarantineUserStatus';

@Component({
  selector: 'app-map-distribution',
  templateUrl: './map-distribution.component.html',
  styleUrls: ['./map-distribution.component.scss']
})

export class MapDistributionComponent implements OnChanges, AfterContentInit {
  @Input('reqest') request_model !: GraphDataRequestModel
  request: MapDataRequestModel = new MapDataRequestModel();
  zoom: number = 8;
  enable: boolean = false;
  visible: boolean = false;
  mapView:boolean = false;
  infoLat: number = 7.723867;
  infoLon: number = 80.771878;
  districtName: string;
  user: any
  markers: any[] = []
  status = QuarantineUserStatus;

  GeoJson: any = {
    "type": "FeatureCollection",
    "features": []
  }

  scaledSize = {
    width: 6,
    height: 6
  }

  iconA = {
    url: '../../../../assets/img/active.png',
    scaledSize: this.scaledSize
  }

  iconC = {
    url: '../../../../assets/img/recoverd.png',
    scaledSize: this.scaledSize
  }

  iconD = {
    url: '../../../../assets/img/deceased.png',
    scaledSize: this.scaledSize
  }

  constructor(
    private _dashboardService: DashboardService,
    private _errorHandlerService: ErrorHandlerService,
    @Inject(ChangeDetectorRef) private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.request_model) {
      this.request.covidCaseType = this.request_model.covidCaseType;
      this.request.districtIds = this.request_model.districtIdList;

      if (this.request.districtIds) {
        this.mapView = false;
        this.loadDistrictsIntoMap(this.request.districtIds);
        // marker is load after dristricts
        // this.getMarkers(this.request)
      }
    }
  }

  ngAfterContentInit() {
  }

  styleFunc(feature) {
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16)
    return ({
      clickable: true,
      fillColor: color,
      strokeWeight: .75,
      fillOpacity: .3,
      strokeOpacity: .5,
      // strokeColor:'#d8d305'
    });
  }

  loadDistrictsIntoMap(ids: Array<number>) {
    this.enable = false;
    this.GeoJson.features = [];
    this._dashboardService.getDistrictsFeatures(d => {
      d.forEach(e => {
        var feture = JSON.parse(e.feature)
        feture.properties.id = e.id
        this.GeoJson.features.push(feture)
      })
      this.zoom = 8;
      this.enable = true
      this.getMarkers(this.request)
    },
      e => {
        this._errorHandlerService.Handler(e);
        this.getMarkers(this.request)
      }
      , ids)
  }

  getMarkers(model: MapDataRequestModel) {
    this._dashboardService.getMarkers(d => {
      this.markers = d;
      this.mapView = true;
    },
      e => {
        this._errorHandlerService.Handler(e);
      }
      , model)
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

  clickedMarker(lat: number, lng: number, id: number) {
    this.infoLat = lat;
    this.infoLon = lng;

    this._dashboardService.getUser(d => {
      // console.log(d);
      this.user = d;
      this.visible = true;
    },
      e => {
        this._errorHandlerService.Handler(e);
      }
      , id)
    // this.visible = true;
    // this.districtName = id.toString();
  }

  setIconType(status: string) {
    if (status === "RECOVERED")
      return this.iconC
    else if (status === "DECEASED")
      return this.iconD
    else if (status === "ACTIVE")
      return this.iconA
  }
}
