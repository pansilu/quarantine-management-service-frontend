import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressSearchMapComponent } from './address-search-map.component';

describe('AddressSearchMapComponent', () => {
  let component: AddressSearchMapComponent;
  let fixture: ComponentFixture<AddressSearchMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressSearchMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressSearchMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
