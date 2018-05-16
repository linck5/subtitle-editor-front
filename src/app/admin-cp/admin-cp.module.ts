import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCpRoutingModule } from './admin-cp-routing.module';
import { FormsModule }    from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { LoginComponent } from './components/login/login.component'


//-------------------COMPONENTS

import { Test1Component } from './components/test1/test1.component';

//_shared
import { TopBarComponent } from './components/_shared/top-bar/top-bar.component';
import { FilterOrderByComponent } from './components/_shared/filter-order-by/filter-order-by.component';
//branches
import { BranchItemComponent } from './components/branches/branch-item/branch-item.component';
import { BranchItemColaboratorListComponent } from './components/branches/branch-item-colaborator-list/branch-item-colaborator-list.component';
import { BranchItemColaboratorItemComponent } from './components/branches/branch-item-colaborator-item/branch-item-colaborator-item.component';
import { BranchListComponent } from './components/branches/branch-list/branch-list.component';
import { BranchFilterPanelComponent } from './components/branches/branch-filter-panel/branch-filter-panel.component';
import { BranchDetailsComponent } from './components/branches/branch-details/branch-details.component';
//subtitles
import { SubtitleItemComponent } from './components/subtitles/subtitle-item/subtitle-item.component';
import { SubtitleListComponent } from './components/subtitles/subtitle-list/subtitle-list.component';
import { SubtitleFilterPanelComponent } from './components/subtitles/subtitle-filter-panel/subtitle-filter-panel.component';
//users
import { UserItemComponent } from './components/users/user-item/user-item.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserFilterPanelComponent } from './components/users/user-filter-panel/user-filter-panel.component';
//videos
import { VideoItemComponent } from './components/videos/video-item/video-item.component';
import { VideoListComponent } from './components/videos/video-list/video-list.component';
import { VideoFilterPanelComponent } from './components/videos/video-filter-panel/video-filter-panel.component';
import { AdminCpComponent } from './admin-cp.component';
import { BranchMainComponent } from './components/branches/branch-main/branch-main.component';

@NgModule({
  imports: [
    CommonModule,
    AdminCpRoutingModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
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
    AdminCpComponent,
    BranchMainComponent,
  ]
})
export class AdminCpModule { }
