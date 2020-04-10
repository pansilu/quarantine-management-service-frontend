import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarantinePersonDistributionComponent } from './quarantine-person-distribution.component';

describe('QuarantinePersonDistributionComponent', () => {
  let component: QuarantinePersonDistributionComponent;
  let fixture: ComponentFixture<QuarantinePersonDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuarantinePersonDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarantinePersonDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
