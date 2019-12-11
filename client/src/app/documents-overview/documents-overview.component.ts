import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Title } from '../types';
import { titlesQuery } from '../graphql';
import { ApolloQueryResult } from 'apollo-client';
import { Router } from '@angular/router';
import { IndexService } from '../services/index.service';
import { PopupFormComponent } from '../shared/popup-form/popup-form.component';

@Component({
	selector: 'app-documents-overview',
	templateUrl: './documents-overview.component.html',
	styleUrls: [ './documents-overview.component.css' ]
})
export class DocumentsOverviewComponent implements OnInit {
	documents: Title[];
	documentsCount: number;

	constructor(
		private dialog: MatDialog,
		private apollo: Apollo,
		private router: Router,
		private indexService: IndexService
	) {}

	ngOnInit() {
		this.apollo
			.query({
				query: titlesQuery
			})
			.toPromise()
			.then((res: ApolloQueryResult<any>) => {
				this.documents = res.data.documents;
				this.documentsCount = res.data.documents.length;
			});
	}

	handleLinkClick(path: string, index: number): void {
		this.indexService.setDocumentIndex(index);
		this.router.navigate([ path ]);
	}

	addDocumentDialog() {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;

		dialogConfig.data = {
			formFields: [
				{ type: 'text', label: 'title', options: {} },
				{ type: 'text', label: 'author', options: {} },
				{ type: 'date', label: 'date', options: {} }
			],
			saveButtonText: 'Create'
		};

		const dialogRef = this.dialog.open(PopupFormComponent, dialogConfig);

		dialogRef.afterClosed().subscribe((form: NgForm) => {
			if (form) {
				console.log(form, form.value, form.value.title);
				//saveToDatabase
			}
		});
	}
}
