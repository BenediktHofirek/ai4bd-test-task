export interface Title {
	_id: string;
	title: string;
}

export interface Document {
	title: string;
	author: string;
	dateCreated: string;
	pages: string[];
}
