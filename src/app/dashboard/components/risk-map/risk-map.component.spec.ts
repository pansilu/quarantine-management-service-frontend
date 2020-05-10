import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskMapComponent } from './risk-map.component';

describe('RiskMapComponent', () => {
  let component: RiskMapComponent;
  let fixture: ComponentFixture<RiskMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
