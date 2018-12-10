import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { SubSyncerComponent } from './components/sub-syncer/sub-syncer-window/sub-syncer.component';
import { LoginComponent } from './components/login/login.component';
import { UserPanelComponent } from './components/sub-syncer/user-panel/user-panel.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'subSyncer',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'admin',
        loadChildren: './admin-cp/admin-cp.module#AdminCpModule'
      },
      {
        path: 'subSyncer',
        component: SubSyncerComponent
      },
      {
        path: 'userPanel',
        component: UserPanelComponent
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
