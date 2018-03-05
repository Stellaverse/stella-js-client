


var stella = {};

stella.config = require('./config/config.js');

stella.api = {
	request : require('./api/request.js')
};

stella.up = {
	upload : require('./up/upload.js'),
	initializeUpload : require('./up/initializeUpload.js'),
	uploadFile : require('./up/uploadFile.js'),
	abortUpload : require('./up/abortUpload.js'),
	finalizeUpload : require('./up/finalizeUpload.js'),
	uploaders : require('./up/uploaders.js'),
	uploads : require('./up/uploads.js')
};

stella.util = {
	getActiveAccount : require('./util/getActiveAccount.js'),
	setActiveAccount : require('./util/setActiveAccount.js'),
	serialize : require('./util/serialize.js')
};

module.exports = stella;
