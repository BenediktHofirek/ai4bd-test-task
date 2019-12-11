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
				console.log(parent);
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
				let document = new Document({
					title: args.title,
					author: args.author,
					dateCreated: args.dateCreated,
					pages: []
				});
				return document.save();
			}
		},
		addPage: {
			type: PageType,
			args: {
				pageNr: { type: new GraphQLNonNull(GraphQLInt) },
				text: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, args) {
				let page = new Page({
					pageNr: args.pageNr,
					text: args.text
				});
				return page.save();
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
