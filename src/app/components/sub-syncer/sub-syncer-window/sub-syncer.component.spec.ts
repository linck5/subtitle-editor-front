import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../../shared/material.module';
import { SubSyncerComponent } from './sub-syncer.component';
import { VideoPreviewComponent } from '../../sub-syncer/video-preview/video-preview.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { SubListComponent } from '../sub-list/sub-list.component';
import { SubItemComponent } from '../timeline/sub-item/sub-item.component';
import { FormsModule } from '@angular/forms';

describe('SubSyncerComponent', () => {
  let component: SubSyncerComponent;
  let fixture: ComponentFixture<SubSyncerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule],
      declarations: [ SubSyncerComponent, VideoPreviewComponent,
         TimelineComponent, SubListComponent, SubItemComponent ]
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
