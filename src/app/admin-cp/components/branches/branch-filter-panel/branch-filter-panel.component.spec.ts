import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchFilterPanelComponent } from './branch-filter-panel.component';

describe('BranchFilterPanelComponent', () => {
  let component: BranchFilterPanelComponent;
  let fixture: ComponentFixture<BranchFilterPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchFilterPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchFilterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});
