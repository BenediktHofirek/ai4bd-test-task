import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-documents-overview',
	templateUrl: './documents-overview.component.html',
	styleUrls: [ './documents-overview.component.css' ]
})
export class DocumentsOverviewComponent implements OnInit {
	constructor() {
  }

  documents = [];

	ngOnInit() {
		this.documents = [
			{
				_id: 1,
				title: 'blockchain',
				author: 'comunity',
				dateCreated: 'yersterday',
				pages: [ 1, 2 ]
			},
			{
				_id: 2,
				title: 'crypto',
				author: 'comunity',
				dateCreated: 'tommorow',
				pages: [ 3, 4 ]
			}
		];
	}
}
