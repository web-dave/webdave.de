import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MarkdownModule } from 'ngx-markdown';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FrameworkModule } from './framework/framework.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatSnackBarModule,
  MatSnackBar,
  MatSnackBarRef
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { ServiceWorkerModule, SwUpdate, SwPush } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FrameworkModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatSnackBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(update: SwUpdate, snackbar: MatSnackBar) {
    update.available.subscribe(u => {
      console.log(u);
      snackbar
        .open('New Blockpost arrived!', 'I wanna read it!')
        .onAction()
        .subscribe(() => {
          window.location.replace(window.location.origin + '/blog');
        });
    });
  }
}
