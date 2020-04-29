import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDistributionComponent } from './map-distribution.component';

describe('MapDistributionComponent', () => {
  let component: MapDistributionComponent;
  let fixture: ComponentFixture<MapDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
