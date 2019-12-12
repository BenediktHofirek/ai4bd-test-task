const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
	title: String,
	author: String,
	dateCreated: String,
	pages: Array
});

module.exports = mongoose.model('Document', documentSchema);
