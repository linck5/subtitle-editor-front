import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//-------------------COMPONENTS
import { AppComponent } from './app.component';
import { Test1Component } from './components/adminControlPanel/test1/test1.component';

//_shared
import { TopBarComponent } from './components/adminControlPanel/_shared/top-bar/top-bar.component';
import { FilterOrderByComponent } from './components/adminControlPanel/_shared/filter-order-by/filter-order-by.component';
//branches
import { BranchItemComponent } from './components/adminControlPanel/branches/branch-item/branch-item.component';
import { BranchItemColaboratorListComponent } from './components/adminControlPanel/branches/branch-item-colaborator-list/branch-item-colaborator-list.component';
import { BranchItemColaboratorItemComponent } from './components/adminControlPanel/branches/branch-item-colaborator-item/branch-item-colaborator-item.component';
import { BranchListComponent } from './components/adminControlPanel/branches/branch-list/branch-list.component';
import { BranchFilterPanelComponent } from './components/adminControlPanel/branches/branch-filter-panel/branch-filter-panel.component';
import { BranchDetailsComponent } from './components/adminControlPanel/branches/branch-details/branch-details.component';
//subtitles
import { SubtitleItemComponent } from './components/adminControlPanel/subtitles/subtitle-item/subtitle-item.component';
import { SubtitleListComponent } from './components/adminControlPanel/subtitles/subtitle-list/subtitle-list.component';
import { SubtitleFilterPanelComponent } from './components/adminControlPanel/subtitles/subtitle-filter-panel/subtitle-filter-panel.component';
//users
import { UserItemComponent } from './components/adminControlPanel/users/user-item/user-item.component';
import { UserListComponent } from './components/adminControlPanel/users/user-list/user-list.component';
import { UserFilterPanelComponent } from './components/adminControlPanel/users/user-filter-panel/user-filter-panel.component';
//videos
import { VideoItemComponent } from './components/adminControlPanel/videos/video-item/video-item.component';
import { VideoListComponent } from './components/adminControlPanel/videos/video-list/video-list.component';
import { VideoFilterPanelComponent } from './components/adminControlPanel/videos/video-filter-panel/video-filter-panel.component';

import { ApiService } from './shared/api.service';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './auth.guard';
import { MaterialModule } from './shared/material.module';
import { SubSyncerComponent } from './components/sub-syncer/sub-syncer-window/sub-syncer.component';
import { SubListComponent } from './components/sub-syncer/sub-list/sub-list.component';




@NgModule({
  declarations: [
    AppComponent,
    Test1Component,

    UserItemComponent,
    UserListComponent,
    TopBarComponent,
    UserFilterPanelComponent,
    BranchItemComponent,
    BranchItemColaboratorListComponent,
    BranchItemColaboratorItemComponent,
    FilterOrderByComponent,
    BranchListComponent,
    SubtitleItemComponent,
    SubtitleListComponent,
    VideoItemComponent,
    VideoListComponent,
    BranchFilterPanelComponent,
    VideoFilterPanelComponent,
    SubtitleFilterPanelComponent,
    BranchDetailsComponent,
    SubSyncerComponent,
    SubListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [ApiService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
