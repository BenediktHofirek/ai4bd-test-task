import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";

import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { DocumentsOverviewComponent } from "./documents-overview/documents-overview.component";
import { DocumentDetailComponent } from "./document-detail/document-detail.component";
import { MaterialModule } from "./material/material.module";
import { ItemComponent } from "./documents-overview/item/item.component";
import { PageComponent } from "./document-detail/page/page.component";
import { PopupFormComponent } from "./shared/popup-form/popup-form.component";
import { IconButtonComponent } from "./shared/icon-button/icon-button.component";
import { FilterComponent } from "./shared/filter/filter.component";
import { appReducer } from "./store/app.reducer";

@NgModule({
  declarations: [
    AppComponent,
    DocumentsOverviewComponent,
    DocumentDetailComponent,
    ItemComponent,
    PageComponent,
    PopupFormComponent,
    IconButtonComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    StoreModule.forRoot(appReducer)
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: "http://localhost:3000/graphql"
          })
        };
      },
      deps: [HttpLink]
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [PopupFormComponent]
})
export class AppModule {}
