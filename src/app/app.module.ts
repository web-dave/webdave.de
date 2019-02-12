import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { MarkdownModule } from "ngx-markdown";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { FrameworkModule } from "./framework/framework.module";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FrameworkModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
