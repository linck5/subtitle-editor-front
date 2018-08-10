import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFilterPanelComponent } from './user-filter-panel.component';

describe('UserFilterPanelComponent', () => {
  let component: UserFilterPanelComponent;
  let fixture: ComponentFixture<UserFilterPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFilterPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFilterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});
