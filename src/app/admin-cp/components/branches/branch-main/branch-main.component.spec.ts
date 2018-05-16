import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchMainComponent } from './branch-main.component';

describe('BranchMainComponent', () => {
  let component: BranchMainComponent;
  let fixture: ComponentFixture<BranchMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
