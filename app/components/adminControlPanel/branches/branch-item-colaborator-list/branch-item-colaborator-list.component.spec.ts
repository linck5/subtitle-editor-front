import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchItemColaboratorListComponent } from './branch-item-colaborator-list.component';

describe('BranchItemColaboratorListComponent', () => {
  let component: BranchItemColaboratorListComponent;
  let fixture: ComponentFixture<BranchItemColaboratorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchItemColaboratorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchItemColaboratorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
