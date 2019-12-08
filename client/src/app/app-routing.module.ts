import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentsOverviewComponent } from './documents-overview/documents-overview.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';

const routes: Routes = [
	{ path: '', component: DocumentsOverviewComponent },
	{ path: ':docId', component: DocumentDetailComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
