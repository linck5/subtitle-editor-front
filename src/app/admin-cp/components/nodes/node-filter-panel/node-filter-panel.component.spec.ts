import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeFilterPanelComponent } from './node-filter-panel.component';

describe('NodeFilterPanelComponent', () => {
  let component: NodeFilterPanelComponent;
  let fixture: ComponentFixture<NodeFilterPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeFilterPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeFilterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});
