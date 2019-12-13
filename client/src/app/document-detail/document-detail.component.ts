import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Document, PageOverview, addPageResult } from '../types';
import { documentQuery, addPageMutation } from '../graphql';
import { ApolloQueryResult } from 'apollo-client';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { PopupFormComponent } from '../shared/popup-form/popup-form.component';
import { NgForm } from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import { AppState } from '../store/app.reducer';

@Component({
	selector: 'app-document-detail',
	templateUrl: './document-detail.component.html',
	styleUrls: [ './document-detail.component.css' ]
})
export class DocumentDetailComponent implements OnInit, OnDestroy {
	private docId: string;
	private subscription: Subscription;
	document: Document;
	pages: PageOverview[];
	convertedDate: string;
	documentNumber: number;
	activeButtonNumber: number;

	constructor(
		private dialog: MatDialog,
		private activatedRoute: ActivatedRoute,
		private apollo: Apollo,
		private store: Store<AppState>,
		private router: Router
	) {}

	ngOnInit() {
		this.docId = this.activatedRoute.snapshot.params['docId'];
		this.subscription = this.store.select('documentNumber').subscribe(store => {
			this.documentNumber = store.documentNumber;
		});

		this.apollo
			.query({
				query: documentQuery,
				variables: { _id: this.docId }
			})
			.toPromise()
			.then((res: ApolloQueryResult<any>): void => {
				this.document = res.data.document;
				this.pages = res.data.document.pages.sort(
					(a: PageOverview, b: PageOverview): boolean => a.pageNr > b.pageNr
				);
				//takes in account incomplete data set; date can be null
				this.convertedDate = res.data.document.dateCreated
					? this.convertDate(res.data.document.dateCreated)
					: '';
			});
	}

	ngOnDestroy(){
		this.subscription.unsubscribe();
	}

	convertDate(dateString: string): string {
		const date = new Date(dateString);
		return `${date.getDate()}.${(date.getMonth() + 1)
			.toString()
			.padStart(2, '0')}.${date.getFullYear().toString().slice(-2)}`;
	}

	handleLinkClick(path: string, clickedButtonNumber: number): void {
		this.activeButtonNumber = clickedButtonNumber;
		this.router.navigate([ path ], { relativeTo: this.activatedRoute });
	}

	addPageDialog(): void {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;

		dialogConfig.data = {
			formFields: [ { type: 'textarea', label: 'text', options: { rows: 10, cols: 15 } } ],
			saveButtonText: 'Add Page'
		};

		const dialogRef = this.dialog.open(PopupFormComponent, dialogConfig);

		dialogRef.afterClosed().subscribe((form?: NgForm): void => {
			if (form) {
				const newPageNr = this.pages.length ? this.pages[this.pages.length - 1].pageNr + 1 : 1;
				this.apollo
					.mutate({
						mutation: addPageMutation,
						variables: { pageNr: newPageNr, text: form.value.text, documentId: this.docId }
					})
					.subscribe((res: addPageResult): void => {
						if (res && res.data && res.data.addPage && res.data.addPage._id) {
							this.pages.push({ _id: res.data.addPage._id, pageNr: newPageNr });
							this.handleLinkClick(res.data.addPage._id, newPageNr);
						} else {
							alert('Error occured while saving page');
						}
					});
			}
		});
	}
}
