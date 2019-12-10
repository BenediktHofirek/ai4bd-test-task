import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Title } from '../types';
import { titlesQuery } from '../graphql';
import { ApolloQueryResult } from 'apollo-client';
import { Router } from '@angular/router';
import { IndexService } from '../services/index.service';

@Component({
	selector: 'app-documents-overview',
	templateUrl: './documents-overview.component.html',
	styleUrls: [ './documents-overview.component.css' ]
})
export class DocumentsOverviewComponent implements OnInit {
	documents: Title[];
	documentsCount: number;

	constructor(private apollo: Apollo, private router: Router, private indexService: IndexService) {}

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
}
