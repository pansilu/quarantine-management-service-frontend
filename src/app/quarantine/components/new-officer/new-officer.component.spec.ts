import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOfficerComponent } from './new-officer.component';

describe('NewOfficerComponent', () => {
  let component: NewOfficerComponent;
  let fixture: ComponentFixture<NewOfficerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOfficerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
