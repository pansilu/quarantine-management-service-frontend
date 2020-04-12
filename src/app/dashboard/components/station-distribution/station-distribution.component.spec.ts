import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationDistributionComponent } from './station-distribution.component';

describe('StationDistributionComponent', () => {
  let component: StationDistributionComponent;
  let fixture: ComponentFixture<StationDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
