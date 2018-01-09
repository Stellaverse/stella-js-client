



stella.up.finalizeUpload = function(upload) {

	if (upload.to === 'account') {
		var api = 'accounts.files.finalizeUpload';
	}

	if (upload.to === 'project') {
		var api = 'drive.objects.finalizeUpload';
	}

	stella.api.request({
		method : 'post',
		api : api,
		params : {
			fileURL : upload.url
		}
	}, function(result) {

		if (result.error) {

			stella.up.uploads[upload.id].status = 'error';
			stella.up.uploads[upload.id].error = result.error;

			upload.onError(stella.up.uploads[upload.id]);

			return;

		}

		stella.up.uploads[upload.id].status = 'complete';

		upload.onComplete(stella.up.uploads[upload.id]);

		return;

	});

};
