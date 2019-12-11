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
		document(_id: $id) {
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
		page(_id: $id) {
			pageNr
			text
		}
	}
`;
