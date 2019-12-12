const graphql = require('graphql');
const Page = require('../models/page');
const Document = require('../models/document');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;

const DocumentType = new GraphQLObjectType({
	name: 'Document',
	fields: () => ({
		_id: { type: GraphQLID },
		title: { type: GraphQLString },
		author: { type: GraphQLString },
		dateCreated: { type: GraphQLString },
		pages: {
			type: GraphQLList(PageType),
			resolve(parent) {
				return Page.find({ _id: { $in: parent.pages } }).then((res) => res);
			}
		}
	})
});

const PageType = new GraphQLObjectType({
	name: 'Page',
	fields: () => ({
		_id: { type: GraphQLID },
		pageNr: { type: GraphQLInt },
		text: { type: GraphQLString }
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		document: {
			type: DocumentType,
			args: { _id: { type: GraphQLString } },
			resolve(parent, args) {
				return Document.findById(args._id);
			}
		},
		page: {
			type: PageType,
			args: { _id: { type: GraphQLString } },
			resolve(parent, args) {
				return Page.findById(args._id);
			}
		},
		documents: {
			type: new GraphQLList(DocumentType),
			resolve(parent, args) {
				return Document.find({});
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addDocument: {
			type: DocumentType,
			args: {
				title: { type: new GraphQLNonNull(GraphQLString) },
				author: { type: GraphQLString },
				dateCreated: { type: GraphQLString }
			},
			resolve(parent, args) {
				const document = new Document({
					title: args.title,
					author: args.author,
					dateCreated: args.dateCreated,
					pages: []
				});
				const newDocument = document.save();
				if (!newDocument) {
					throw new Error('Cannot save document');
				}
				return newDocument;
			}
		},
		addPage: {
			type: PageType,
			args: {
				pageNr: { type: new GraphQLNonNull(GraphQLInt) },
				text: { type: new GraphQLNonNull(GraphQLString) },
				documentId: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, args) {
				const page = new Page({
					pageNr: args.pageNr,
					text: args.text
				});

				const newPage = page.save();
				if (!newPage) {
					throw new Error('Cannot save page');
				} else {
					//add page _id to its parent document "pages<<array>>"
					newPage.then((res) => {
						return Document.updateOne({ _id: args.documentId }, { $push: { pages: res._id } });
					});
					return newPage;
				}
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
