import { Component, OnInit, ViewChild, AfterContentInit, ChangeDetectorRef, Inject, Input, SimpleChanges, OnChanges } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { DashboardService } from 'src/app/Service/dashboard.service';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';
import { GraphDataRequestModel } from '../../models/graph-data-request.model';
import { MapDataRequestModel } from '../../models/map-data-request.model';
import QuarantineUserStatus from '../../models/QuarantineUserStatus';
@Component({
  selector: 'app-risk-map',
  templateUrl: './risk-map.component.html',
  styleUrls: ['./risk-map.component.scss']
})
export class RiskMapComponent implements OnChanges {

  @Input('reqest') request_model !: number
  // request: MapDataRequestModel = new MapDataRequestModel();
  zoom: number = 8;
  enable: boolean = false;
  visible: boolean = false;
  mapView: boolean = false;
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

  DistrictGeoJson: any = {
    "type": "FeatureCollection",
    "features": []
  }

  // scaledSize = {
  //   width: 8,
  //   height: 8
  // }

  // iconA = {
  //   url: '../../../../assets/img/active.png',
  //   scaledSize: this.scaledSize
  // }

  // iconC = {
  //   url: '../../../../assets/img/recoverd.png',
  //   scaledSize: this.scaledSize
  // }

  // iconD = {
  //   url: '../../../../assets/img/deceased.png',
  //   scaledSize: this.scaledSize
  // }

  constructor(
    private _dashboardService: DashboardService,
    private _errorHandlerService: ErrorHandlerService,
    @Inject(ChangeDetectorRef) private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.request_model) {
      // this.request.covidCaseType = this.request_model.covidCaseType;
      // this.request.districtIds = this.request_model.districtIdList;

      // if (this.request.districtIds) {
      //   this.mapView = false;
      //   // this.loadGndIntoMap(10);
      //   this.loadDistrinctCenter(6);
      //   // marker is load after dristricts
      //   // this.getMarkers(this.request)
      // }
      this.loadDistrict(this.request_model);
    }
  }

  ngAfterContentInit() {
  }

  styleFunc(feature) {
    return ({
      clickable: true,
      fillColor: feature.getProperty("color"),
      strokeWeight: .75,
      fillOpacity: .3,
      strokeOpacity: .5,
      // strokeColor:'#d8d305'
    });
  }

  districtStyleFunc(feature) {
    return ({
      clickable: false,
      strokeWeight: .75,
      fillOpacity: 0,
      strokeOpacity: .5,
      // strokeColor:'#d8d305'
    });
  }

  loadGndIntoMap(id: number) {
    this.enable = false;
    this._dashboardService.getRiskArea(d => {
      this.GeoJson.features = [];
      d.forEach(e => {
        var feture = JSON.parse(e.feature)
        feture.properties.id = e.id
        feture.properties.color = this.getRiskTypeColor(e.riskType);
        this.GeoJson.features.push(feture)
      })
      // this.zoom = 8;
      this.enable = true
      this.mapView = true;
      // this.getMarkers(this.request)

    },
      e => {
        this._errorHandlerService.Handler(e);
        // this.getMarkers(this.request)
      }
      , id)
  }

  loadDistrict(id: number) {
    this._dashboardService.getDistrict(d => {
      this.DistrictGeoJson.features = [];
      var feture = JSON.parse(d.feature);
      this.DistrictGeoJson.features.push(feture)
      // get center of the district
      this.calCenterOfPoliline(feture)
      this.loadGndIntoMap(id)
    }, e => {
      this._errorHandlerService.Handler(e);
      this.loadGndIntoMap(id)
    }
      , id)
  }

  calCenterOfPoliline(feature: any) {
    if (feature.geometry.geometries) {
      // console.log("array");
      var avg = (feature.geometry.geometries[0].coordinates[0].length - 1) / 4
      var Q_1 = feature.geometry.geometries[0].coordinates[0][Math.floor(avg)]
      var Q_2 = feature.geometry.geometries[0].coordinates[0][Math.floor(avg) * 2]
      var Q_3 = feature.geometry.geometries[0].coordinates[0][Math.floor(avg) * 3]
      var Q_4 = feature.geometry.geometries[0].coordinates[0][Math.floor(avg) * 4]
      var lon = (Q_1[0] + Q_2[0] + Q_3[0] + Q_4[0]) / 4
      var lat = (Q_1[1] + Q_2[1] + Q_3[1] + Q_4[1]) / 4

      this.infoLat = lat;
      this.infoLon = lon;
    }
    else {
      // console.log("normal object");
      var avg = (feature.geometry.coordinates[0].length - 1) / 4

      var Q_1 = feature.geometry.coordinates[0][Math.floor(avg)]
      var Q_2 = feature.geometry.coordinates[0][Math.floor(avg) * 2]
      var Q_3 = feature.geometry.coordinates[0][Math.floor(avg) * 3]
      var Q_4 = feature.geometry.coordinates[0][Math.floor(avg) * 4]


      var lon = (Q_1[0] + Q_2[0] + Q_3[0] + Q_4[0]) / 4
      var lat = (Q_1[1] + Q_2[1] + Q_3[1] + Q_4[1]) / 4

      this.infoLat = lat;
      this.infoLon = lon;
    }
    this.zoom = 10;
  }

  getRiskTypeColor(riskLevel: string): string {
    switch (riskLevel) {
      case "HIGH":
        return "red";
      case "MODERATE":
        return "orange";
      case "NO_RISK":
        return "green";
      default:
        return "gray";
    }
  }

  // getMarkers(model: MapDataRequestModel) {
  //   this._dashboardService.getMarkers(d => {
  //     this.markers = d;
  //     this.mapView = true;
  //   },
  //     e => {
  //       this._errorHandlerService.Handler(e);
  //     }
  //     , model)
  // }

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

  // setIconType(status: string) {
  //   if (status === "RECOVERED")
  //     return this.iconC
  //   else if (status === "DECEASED")
  //     return this.iconD
  //   else if (status === "ACTIVE")
  //     return this.iconA
  // }

}
