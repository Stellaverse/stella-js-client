



stella.up.finalizeUpload = function(upload) {

	if (upload.to === 'account') {
		var request = {
			method : 'post',
			api : 'accounts.files.finalizeUpload',
			params : {
				fileURL : upload.url
			}
		};
	}

	if (upload.to === 'drive') {
		var request = {
			method : 'post',
			api : 'drive.objects.finalizeObjectUpload',
			projectID : upload.projectID,
			params : {
				objectID : upload.objectID
			}
		};
	}

	stella.api.request(request, function(result) {

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
