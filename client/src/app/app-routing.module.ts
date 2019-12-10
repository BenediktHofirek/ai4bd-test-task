import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentsOverviewComponent } from './documents-overview/documents-overview.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { PageComponent } from './document-detail/page/page.component';

const routes: Routes = [
	{ path: '', component: DocumentsOverviewComponent },
	{
		path: ':docId',
		component: DocumentDetailComponent,
		children: [ { path: ':pageId', component: PageComponent } ]
	},
	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
