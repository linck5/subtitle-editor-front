import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../../shared/material.module';
import { SubSyncerComponent } from './sub-syncer.component';
import { VideoPreviewComponent } from '../../sub-syncer/video-preview/video-preview.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { SubListComponent } from '../sub-list/sub-list.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SubSyncerComponent', () => {
  let component: SubSyncerComponent;
  let fixture: ComponentFixture<SubSyncerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MaterialModule, FormsModule, HttpClientModule],
      declarations: [ SubSyncerComponent, VideoPreviewComponent,
         TimelineComponent, SubListComponent],
      providers: [ApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubSyncerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
