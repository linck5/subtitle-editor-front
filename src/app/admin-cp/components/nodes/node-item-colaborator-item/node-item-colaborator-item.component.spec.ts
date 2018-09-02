import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeItemColaboratorItemComponent } from './node-item-colaborator-item.component';

describe('NodeItemColaboratorItemComponent', () => {
  let component: NodeItemColaboratorItemComponent;
  let fixture: ComponentFixture<NodeItemColaboratorItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeItemColaboratorItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeItemColaboratorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});
