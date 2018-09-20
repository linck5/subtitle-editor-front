import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { SubSyncerComponent } from './components/sub-syncer/sub-syncer-window/sub-syncer.component';
import { LoginComponent } from './components/login/login.component';
const routes: Routes = [

  {
    path: '',
    redirectTo: 'subSyncer',
    pathMatch: 'full'
  },

  {
    path: '',
    // canActivateChild: [AuthGuard], // taking this out temporarily for testing. we gotta figure out a way to properly disable auth for dev
    children: [
      {
        path: 'admin',
        loadChildren: './admin-cp/admin-cp.module#AdminCpModule'
      },

      {
        path: 'subSyncer',
        component: SubSyncerComponent
      }
    ]
  },

  {
    path: 'login',
    component: LoginComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
