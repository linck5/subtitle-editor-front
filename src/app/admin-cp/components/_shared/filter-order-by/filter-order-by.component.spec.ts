import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterOrderByComponent } from './filter-order-by.component';

describe('FilterOrderByComponent', () => {
  let component: FilterOrderByComponent;
  let fixture: ComponentFixture<FilterOrderByComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterOrderByComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterOrderByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});
