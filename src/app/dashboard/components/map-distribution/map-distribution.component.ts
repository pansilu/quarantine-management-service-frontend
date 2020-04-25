import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-map-distribution',
  templateUrl: './map-distribution.component.html',
  styleUrls: ['./map-distribution.component.scss']
})
// export class MapDistributionComponent implements OnInit {

  
//   constructor() { }

//   ngOnInit() {
//   }

// }

export class MapDistributionComponent implements OnInit, AfterContentInit {
  // @ViewChild('gmap', { static: true }) gmapElement: any;
  private map;
  private ctaLayer;
  zoom:number = 12;
  //ctaLayer: google.maps.KmlLayer;

  constructor(
    private mapsAPILoader: MapsAPILoader,
  ) { }

  ngOnInit() {

    // this.mapsAPILoader.load().then(() => {
    //   let mapProp: any = {
    //     center: new google.maps.LatLng(44.475, -73.212),
    //     zoom: 13,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //   };

    //   this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    //   let ctaLayer = new google.maps.KmlLayer({
    //     url: 'https://sites.google.com/site/freeparkingburlington/home/freeParking.kml',
    //     map: this.map
    //   });

    // })
  }

  ngAfterContentInit() {
    // let ctaLayer = new google.maps.KmlLayer({
    //   url: 'https://sites.google.com/site/freeparkingburlington/home/freeParking.kml',
    //   map: this.map
    // });
  }

}
