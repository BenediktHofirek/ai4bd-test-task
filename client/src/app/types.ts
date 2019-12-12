export interface DocumentOverview {
	_id: string;
	title: string;
}

export interface Document {
	title: string;
	author: string;
	dateCreated: string;
	pages: Page[];
}

export interface Page {
	_id: string;
	pageNr: number;
	text: string;
}

export interface PageOverview {
	_id: string;
	pageNr: number;
}

export interface addDocumentResult {
	data: {
		addDocument: {
			_id: string;
		};
	};
}

export interface addPageResult {
	data: {
		addPage: {
			_id: string;
		};
	};
}
