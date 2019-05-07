import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './_sharing/modules/material.module';
import { FormsModule } from '@angular/forms';
import { FileDropModule } from 'ngx-file-drop';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MatNavComponent } from './modules/mat-nav/mat-nav.component';
import { UploadComponent } from './modules/upload/upload.component';
import { HttpClientModule } from '@angular/common/http';

import { VideoComponent } from './modules/video/video.component';


@NgModule({
  declarations: [
    AppComponent,
    MatNavComponent,
    UploadComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FileDropModule
  ],
  entryComponents: [MatNavComponent, UploadComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
