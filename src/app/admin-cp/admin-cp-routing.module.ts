import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { UserMainComponent } from './components/users/user-main/user-main.component';
import { BranchMainComponent } from './components/branches/branch-main/branch-main.component';
import { SubtitleMainComponent } from './components/subtitles/subtitle-main/subtitle-main.component';
import { VideoMainComponent } from './components/videos/video-main/video-main.component';
import { AdminCpComponent } from './admin-cp.component';




const adminCpRoutes: Routes = [
  {
    path: '',
    redirectTo: 'branches',
    pathMatch: 'full'
  },

  {
    path: '',
    component: AdminCpComponent,
    children: [
      {
        path: 'users',
        component: UserMainComponent
      },
      {
        path: 'branches',
        component: BranchMainComponent
      },
      {
        path: 'subtitles',
        component: SubtitleMainComponent
      },
      {
        path: 'videos',
        component: VideoMainComponent
      }
    ]
  },

  {
    path: 'login',
    component: LoginComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(adminCpRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminCpRoutingModule { }
