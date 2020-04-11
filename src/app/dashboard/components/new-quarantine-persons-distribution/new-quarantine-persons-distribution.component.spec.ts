import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuarantinePersonsDistributionComponent } from './new-quarantine-persons-distribution.component';

describe('NewQuarantinePersonsDistributionComponent', () => {
  let component: NewQuarantinePersonsDistributionComponent;
  let fixture: ComponentFixture<NewQuarantinePersonsDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewQuarantinePersonsDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQuarantinePersonsDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
