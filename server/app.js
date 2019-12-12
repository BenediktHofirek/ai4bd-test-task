const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const cors = require('cors');
const app = express();

mongoose
	// .connect('mongodb://silas:BJJjtTPyUV6XPd7x@94.130.203.236:27022/doc_viewer', {
	// 	authSource: 'doc_viewer',
	// 	useNewUrlParser: true,
	// 	useUnifiedTopology: true
	// })
	.connect('mongodb://127.0.0.1:27017/test', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('connection successful'))
	.catch((err) => console.error(err));

app.use(cors());

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true
	})
);

app.listen(3000);
