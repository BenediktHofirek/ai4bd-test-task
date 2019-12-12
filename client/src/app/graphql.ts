import gql from 'graphql-tag';

export const titlesQuery = gql`
	query TitlesQuery {
		documents {
			_id
			title
		}
	}
`;

export const documentQuery = gql`
	query DocumentQuery($_id: String!) {
		document(_id: $_id) {
			title
			author
			dateCreated
			pages {
				_id
				pageNr
			}
		}
	}
`;

export const pageQuery = gql`
	query PageQuery($_id: String!) {
		page(_id: $_id) {
			pageNr
			text
		}
	}
`;

export const addPageMutation = gql`
	mutation addPageMutation($pageNr: Int!, $text: String!, $documentId: String!) {
		addPage(pageNr: $pageNr, text: $text, documentId: $documentId) {
			_id
		}
	}
`;

export const addDocumentMutation = gql`
	mutation addDocumentMutation($title: String!, $author: String!, $dateCreated: String!) {
		addDocument(title: $title, author: $author, dateCreated: $dateCreated) {
			_id
		}
	}
`;
