import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { SubSyncerComponent } from './components/sub-syncer/sub-syncer-window/sub-syncer.component';
const routes: Routes = [

  {
    path: '',
    redirectTo: 'subSyncer',
    pathMatch: 'full'
  },

  {
    path: 'admin',
        loadChildren: './admin-cp/admin-cp.module#AdminCpModule'

  },

  {
    path: 'subSyncer',
    component: SubSyncerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
