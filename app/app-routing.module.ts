import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Test1Component } from './components/adminControlPanel/test1/test1.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [

  {
    path: '',
    redirectTo: 'test1',
    pathMatch: 'full'
  },

  {
    path: 'test1',
    component: Test1Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
