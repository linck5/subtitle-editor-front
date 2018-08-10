import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoFilterPanelComponent } from './video-filter-panel.component';

describe('VideoFilterPanelComponent', () => {
  let component: VideoFilterPanelComponent;
  let fixture: ComponentFixture<VideoFilterPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoFilterPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoFilterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});
