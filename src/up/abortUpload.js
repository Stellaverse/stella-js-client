


module.exports = function(uploadID) {

	var upload = stella.up.uploads[uploadID];
	var uploader = stella.up.uploaders[uploadID];

	uploader.abort();

	stella.up.uploads[uploadID].status = 'aborted';

	upload.onAbort(stella.up.uploads[uploadID]);

	return stella.up.finalizeUpload(stella.up.uploads[uploadID]);

}
