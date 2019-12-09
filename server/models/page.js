const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
	_id: Schema.Types.ObjectId,
	page: Number,
	text: String
});

module.exports = mongoose.model('Page', pageSchema);
