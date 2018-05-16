import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchItemColaboratorItemComponent } from './branch-item-colaborator-item.component';

describe('BranchItemColaboratorItemComponent', () => {
  let component: BranchItemColaboratorItemComponent;
  let fixture: ComponentFixture<BranchItemColaboratorItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchItemColaboratorItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchItemColaboratorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
