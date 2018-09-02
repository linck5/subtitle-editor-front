import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeItemColaboratorListComponent } from './node-item-colaborator-list.component';

describe('NodeItemColaboratorListComponent', () => {
  let component: NodeItemColaboratorListComponent;
  let fixture: ComponentFixture<NodeItemColaboratorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeItemColaboratorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeItemColaboratorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});
