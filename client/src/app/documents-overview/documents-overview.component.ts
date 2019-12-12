import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { DocumentOverview, addDocumentResult } from '../types';
import { titlesQuery, addDocumentMutation } from '../graphql';
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
	documents: DocumentOverview[];
	filteredDocuments: DocumentOverview[];
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
				this.filteredDocuments = [...res.data.documents];
				this.documentsCount = res.data.documents.length;
			});
	}

	filterDocuments(filter: string):void{
		if (filter){
			this.filteredDocuments = this.documents.filter(doc => doc.title.slice(0, filter.length) === filter);
		} else {
			this.filteredDocuments = this.documents;
		}
	}

	handleLinkClick(path: string, index: number): void {
		this.indexService.setDocumentIndex(index);
		this.router.navigate([ path ]);
	}

	addDocumentDialog(): void {
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
				//loading spinner
				const { value } = form;
				const { title, author, date } = value;
				this.apollo
					.mutate({
						mutation: addDocumentMutation,
						variables: { title: title, author: author, dateCreated: date }
					})
					.subscribe((res: addDocumentResult) => {
						if (res && res.data && res.data.addDocument && res.data.addDocument._id) {
							this.documents.push({ _id: res.data.addDocument._id, title: title });
							this.filterDocuments("");
							//remove loading spinner
						} else {
							alert('Error occured while saving document');
							//remove loading spinner
							//message something went wrong
						}
					});
			}
		});
	}
}
