const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
	_id: Schema.Types.ObjectId,
	title: String,
	author: String,
	dateCreated: Date,
	pages: Array
});

module.exports = mongoose.model('Document', documentSchema);
