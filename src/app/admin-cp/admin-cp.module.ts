import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCpRoutingModule } from './admin-cp-routing.module';
import { FormsModule }    from '@angular/forms';
import { MaterialModule } from '../shared/material.module';


//-------------------COMPONENTS

import { Test1Component } from './components/test1/test1.component';

//_shared
import { TopBarComponent } from './components/_shared/top-bar/top-bar.component';
import { FilterOrderByComponent } from './components/_shared/filter-order-by/filter-order-by.component';
//nodes
import { NodeItemComponent } from './components/nodes/node-item/node-item.component';
import { NodeItemColaboratorListComponent } from './components/nodes/node-item-colaborator-list/node-item-colaborator-list.component';
import { NodeItemColaboratorItemComponent } from './components/nodes/node-item-colaborator-item/node-item-colaborator-item.component';
import { NodeListComponent } from './components/nodes/node-list/node-list.component';
import { NodeFilterPanelComponent } from './components/nodes/node-filter-panel/node-filter-panel.component';
import { NodeDetailsComponent } from './components/nodes/node-details/node-details.component';
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
import { NodeMainComponent } from './components/nodes/node-main/node-main.component';
import { UserMainComponent } from './components/users/user-main/user-main.component';
import { SubtitleMainComponent } from './components/subtitles/subtitle-main/subtitle-main.component';
import { VideoMainComponent } from './components/videos/video-main/video-main.component';
import { AdmCpNotFoundComponent } from './components/adm-cp-not-found/adm-cp-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    AdminCpRoutingModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    Test1Component,

    UserItemComponent,
    UserListComponent,
    TopBarComponent,
    UserFilterPanelComponent,
    NodeItemComponent,
    NodeItemColaboratorListComponent,
    NodeItemColaboratorItemComponent,
    FilterOrderByComponent,
    NodeListComponent,
    SubtitleItemComponent,
    SubtitleListComponent,
    VideoItemComponent,
    VideoListComponent,
    NodeFilterPanelComponent,
    VideoFilterPanelComponent,
    SubtitleFilterPanelComponent,
    NodeDetailsComponent,
    AdminCpComponent,
    NodeMainComponent,
    UserMainComponent,
    SubtitleMainComponent,
    VideoMainComponent,
    AdmCpNotFoundComponent,
  ]
})
export class AdminCpModule { }
