import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Document } from '../types';
import { documentQuery } from '../graphql';
import { ApolloQueryResult } from 'apollo-client';
import { IndexService } from '../services/index.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { PopupFormComponent } from '../shared/popup-form/popup-form.component';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-document-detail',
	templateUrl: './document-detail.component.html',
	styleUrls: [ './document-detail.component.css' ]
})
export class DocumentDetailComponent implements OnInit {
	private docId: string;
	document: Document;
	pages: string[];
	convertedDate: string;
	documentNumber: number;
	activeButtonIndex: number;

	constructor(
		private dialog: MatDialog,
		private activatedRoute: ActivatedRoute,
		private apollo: Apollo,
		private indexService: IndexService,
		private router: Router
	) {}

	ngOnInit() {
		this.docId = this.activatedRoute.snapshot.params['docId'];
		this.documentNumber = this.indexService.getDocumentIndex() + 1;
		this.apollo
			.query({
				query: documentQuery,
				variables: { id: this.docId }
			})
			.toPromise()
			.then((res: ApolloQueryResult<any>) => {
				this.document = res.data.document;
				this.pages = res.data.document.pages;
				this.convertedDate = res.data.document.dateCreated
					? this.convertDate(res.data.document.dateCreated)
					: '';
			});
	}

	convertDate(dateInMiliseconds: string): string {
		const date = new Date(+dateInMiliseconds);
		return `${date.getDate()}.${(date.getMonth() + 1)
			.toString()
			.padStart(2, '0')}.${date.getFullYear().toString().slice(-2)}`;
	}

	handleLinkClick(path: string, index: number): void {
		this.indexService.setPageIndex(index);
		this.activeButtonIndex = index;
		this.router.navigate([ path ], { relativeTo: this.activatedRoute });
	}

	addPageDialog() {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;

		dialogConfig.data = {
			formFields: [ { type: 'textarea', label: 'text', options: { rows: '15', cols: '50' } } ],
			saveButtonText: 'Add Page'
		};

		const dialogRef = this.dialog.open(PopupFormComponent, dialogConfig);

		dialogRef.afterClosed().subscribe((form: NgForm) => {
			if (form) {
				console.log(form, form.value, form.value.text);
				//saveToDatabase
			}
		});
	}
}
