const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const Page = require('./models/page');
const Document = require('./models/document');
const cors = require('cors');
const app = express();

mongoose
	.connect('mongodb://silas:BJJjtTPyUV6XPd7x@94.130.203.236:27022/doc_viewer', {
		authSource: 'doc_viewer',
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('connection successful'))
	.catch((err) => console.error(err));

const root = {
	page: ({ id }) => {
		return Page.findById(id);
	},
	document: ({ id }) => {
		return Document.findById(id);
	},
	documents: () => {
		return Document.find({});
	}
};

app.use(cors());

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		rootValue: root,
		graphiql: true
	})
);

app.listen(3000);
