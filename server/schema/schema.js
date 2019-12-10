var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Page {
      _id: ID
      page: Int
      text: String
  }

  type Document {
    _id: ID
    title: String
    author: String
    dateCreated: String
    pages: [ID]
  }

  type Query {
    page(id: String): Page
    document(id: String): Document
    documents: [Document]
  }
`);

module.exports = schema;
