var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var ListSchema = new Schema({
	name: {
		type: String,
		trim: true,
		default: ''
	},
	discription: {
		type: String,
		trim: true,
		default: ''
	},
	admins: [{ type: Number, ref: 'User' }],
	members: [{ type: Number, ref: 'User' }],
	additionalData: {}

});

module.exports = mongoose.model('List', ListSchema);
