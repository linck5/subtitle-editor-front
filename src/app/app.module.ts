import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { ApiService } from './shared/api.service';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './auth.guard';
import { MaterialModule } from './shared/material.module';
import { SubSyncerComponent } from './components/sub-syncer/sub-syncer-window/sub-syncer.component';
import { SubListComponent } from './components/sub-syncer/sub-list/sub-list.component';
import { VideoPreviewComponent } from './components/sub-syncer/video-preview/video-preview.component';

import { Autosize } from './components/sub-syncer/autosize.directive';
import { TimelineComponent } from './components/sub-syncer/timeline/timeline.component';
import { AutofocusDirective } from './shared/autofocus.directive';
import { ShiftTimesComponent } from './components/sub-syncer/shift-times/shift-times.component';
import { SideMenuComponent } from './components/sub-syncer/side-menu/side-menu.component';
import { UserPanelComponent } from './components/sub-syncer/user-panel/user-panel.component';
// import { SubItemComponent } from './components/sub-syncer/timeline/sub-item/sub-item.component'


@NgModule({
  declarations: [
    Autosize,
    AppComponent,
    LoginComponent,

    SubSyncerComponent,
    SubListComponent,
    VideoPreviewComponent,
    TimelineComponent,
    AutofocusDirective,
    ShiftTimesComponent,
    SideMenuComponent,
    UserPanelComponent
    // SubItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ApiService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [
    ShiftTimesComponent
  ]
})
export class AppModule {}
