import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmCpNotFoundComponent } from './adm-cp-not-found.component';

describe('AdmCpNotFoundComponent', () => {
  let component: AdmCpNotFoundComponent;
  let fixture: ComponentFixture<AdmCpNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmCpNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmCpNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
