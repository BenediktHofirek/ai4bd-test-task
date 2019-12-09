const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const Page = require('./models/page');
const Document = require('./models/document');

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
	page: ({ _id }) => {
		return Page.findById(_id);
	},
	documents: () => {
		return Document.find({});
	}
};

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		rootValue: root,
		graphiql: true
	})
);

app.listen(3000);

// var express = require('express');
// var graphqlHTTP = require('express-graphql');
// var { buildSchema } = require('graphql');

// // Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//     type Fill {
//         id: String,
//         text: String
//     }
//   type RandomDie {
//     numSides: Int!
//     rollOnce: Int!
//     roll(numRolls: Int!): [Fill]
//   }

//   type Query {
//     getDie(numSides: Int): RandomDie
//   }
// `);

// // This class implements the RandomDie GraphQL type
// class RandomDie {
//   constructor(numSides) {
//     this.numSides = numSides;
//   }

//   rollOnce() {
//     return 1 + Math.floor(Math.random() * this.numSides);
//   }

//   roll({numRolls}) {
//     var output = [];
//     for (var i = 0; i < numRolls; i++) {
//       output.push({id: '123', text: 'stringeuo'});
//     }
//     return output;
//   }
// }

// // The root provides the top-level API endpoints
// var root = {
//   getDie: ({numSides}) => {
//     return new RandomDie(numSides || 6);
//   }
// }

// var app = express();
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));
// app.listen(3000);
// console.log('Running a GraphQL API server at localhost:3000/graphql');
