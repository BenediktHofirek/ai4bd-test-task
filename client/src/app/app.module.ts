import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";

import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { DocumentsOverviewComponent } from "./documents-overview/documents-overview.component";
import { DocumentDetailComponent } from "./document-detail/document-detail.component";
import { MaterialModule } from "./material/material.module";
import { ItemComponent } from "./documents-overview/item/item.component";
import { FormsModule } from "@angular/forms";
import { PageComponent } from "./document-detail/page/page.component";

@NgModule({
  declarations: [
    AppComponent,
    DocumentsOverviewComponent,
    DocumentDetailComponent,
    ItemComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
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
  bootstrap: [AppComponent]
})
export class AppModule {}
