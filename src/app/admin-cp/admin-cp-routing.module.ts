import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { BranchMainComponent } from './components/branches/branch-main/branch-main.component';
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
        path: 'branches',
        component: BranchMainComponent

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
