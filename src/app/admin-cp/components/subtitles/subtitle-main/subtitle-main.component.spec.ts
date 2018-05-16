import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtitleMainComponent } from './subtitle-main.component';

describe('SubtitleMainComponent', () => {
  let component: SubtitleMainComponent;
  let fixture: ComponentFixture<SubtitleMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtitleMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtitleMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
