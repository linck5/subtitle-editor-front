import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSyncerComponent } from './sub-syncer.component';

describe('SubSyncerComponent', () => {
  let component: SubSyncerComponent;
  let fixture: ComponentFixture<SubSyncerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubSyncerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubSyncerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
