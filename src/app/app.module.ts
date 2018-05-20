import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    SubSyncerComponent,
    SubListComponent,
    VideoPreviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [ApiService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
