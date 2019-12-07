import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DocumentsOverviewComponent } from "./documents-overview/documents-overview.component";
import { DocumentDetailComponent } from "./document-detail/document-detail.component";
import { MaterialModule } from "./material/material.module";
import { ItemComponent } from './documents-overview/item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentsOverviewComponent,
    DocumentDetailComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
