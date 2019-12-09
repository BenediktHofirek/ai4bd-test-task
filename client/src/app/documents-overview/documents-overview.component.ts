import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Title} from '../types';
import { titlesQuery } from '../graphql';

@Component({
	selector: 'app-documents-overview',
	templateUrl: './documents-overview.component.html',
	styleUrls: [ './documents-overview.component.css' ]
})
export class DocumentsOverviewComponent implements OnInit {
	private documents: Title[];
	
	constructor(private apollo: Apollo) {}

	ngOnInit() {
		this.documents = [
			{
				title: 'blockchain'
			},
			{
				title: 'crypto'
			}
		];

		this.apollo.query({
			query: titlesQuery
		  }).toPromise().then((value) => {
			console.log(value);
		  });
	}
}
