import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtitleFilterPanelComponent } from './subtitle-filter-panel.component';

describe('SubtitleFilterPanelComponent', () => {
  let component: SubtitleFilterPanelComponent;
  let fixture: ComponentFixture<SubtitleFilterPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtitleFilterPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtitleFilterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should

});
