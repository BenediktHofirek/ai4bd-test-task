const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
	pageNr: Number,
	text: String
});

module.exports = mongoose.model('Page', pageSchema);
