import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
//import { LoginComponent } from './components/login/login.component';

import { UserMainComponent } from './components/users/user-main/user-main.component';
import { NodeMainComponent } from './components/nodes/node-main/node-main.component';
import { SubtitleMainComponent } from './components/subtitles/subtitle-main/subtitle-main.component';
import { VideoMainComponent } from './components/videos/video-main/video-main.component';
import { AdmCpNotFoundComponent } from './components/adm-cp-not-found/adm-cp-not-found.component';
import { AdminCpComponent } from './admin-cp.component';

import { Test1Component } from './components/test1/test1.component';




const adminCpRoutes: Routes = [
  {
    path: '',
    redirectTo: 'nodes',
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
        path: 'nodes',
        component: NodeMainComponent
      },
      {
        path: 'subtitles',
        component: SubtitleMainComponent
      },
      {
        path: 'videos',
        component: VideoMainComponent
      },
      {
        path: 'test1',
        component: Test1Component
      },
      {
        path: '**',
        component: AdmCpNotFoundComponent
      }
    ]
  },

  // {
  //   path: 'login',
  //   component: LoginComponent
  // }

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
