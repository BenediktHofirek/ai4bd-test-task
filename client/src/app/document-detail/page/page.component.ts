import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { pageQuery } from '../../graphql';
import { ApolloQueryResult } from 'apollo-client';
import { IndexService } from '../../services/index.service';

@Component({
	selector: 'app-page',
	templateUrl: './page.component.html',
	styleUrls: [ './page.component.css' ]
})
export class PageComponent implements OnInit {
	pageNumber: number;
	text: string;
	constructor(private route: ActivatedRoute, private indexService: IndexService, private apollo: Apollo) {}

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			this.queryDatabase(params['pageId']);
			this.pageNumber = this.indexService.getPageIndex() + 1;
		});

		this.pageNumber = this.indexService.getPageIndex() + 1;
		this.queryDatabase(this.route.snapshot.params['pageId']);
	}

	queryDatabase = (id: string): void => {
		this.apollo
			.query({
				query: pageQuery,
				variables: { id: id }
			})
			.toPromise()
			.then((res: ApolloQueryResult<any>) => {
				this.text = res.data.page.text;
			});
	};
}
