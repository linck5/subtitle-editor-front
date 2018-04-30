import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtitleItemComponent } from './subtitle-item.component';

describe('SubtitleItemComponent', () => {
  let component: SubtitleItemComponent;
  let fixture: ComponentFixture<SubtitleItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtitleItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtitleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
