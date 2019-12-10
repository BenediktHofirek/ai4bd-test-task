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
	query DocumentQuery($id: String!) {
		document(id: $id) {
			title
			author
			dateCreated
			pages
		}
	}
`;

export const pageQuery = gql`
	query PageQuery($id: String!) {
		page(id: $id) {
			text
		}
	}
`;
