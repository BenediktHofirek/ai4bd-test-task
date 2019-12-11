import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { pageQuery } from '../../graphql';
import { ApolloQueryResult } from 'apollo-client';
import { IndexService } from '../../services/index.service';
import { Page } from '../../types';

@Component({
	selector: 'app-page',
	templateUrl: './page.component.html',
	styleUrls: [ './page.component.css' ]
})
export class PageComponent implements OnInit {
	page: Page;
	constructor(private route: ActivatedRoute, private apollo: Apollo) {}

	ngOnInit() {
		this.queryDatabase(this.route.snapshot.params['pageId']);

		this.route.params.subscribe((params: Params) => {
			this.queryDatabase(params['pageId']);
		});
	}

	queryDatabase = (id: string): void => {
		this.apollo
			.query({
				query: pageQuery,
				variables: { _id: id }
			})
			.toPromise()
			.then((res: ApolloQueryResult<any>) => {
				this.page = res.data.page;
			});
	};
}
