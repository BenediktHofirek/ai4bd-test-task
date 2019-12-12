import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class IndexService {
	private documentIndex: number;

	constructor() {}

	getDocumentIndex(): number {
		return this.documentIndex;
	}

	setDocumentIndex(index: number): void {
		this.documentIndex = index;
	}
}
