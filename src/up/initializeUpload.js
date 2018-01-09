


stella.up.initializeUpload = function(upload) {

	var account = stella.util.getActiveAccount();
	var to = upload.to || 'project';
	var file = upload.file;

	if (to === 'account') {
		var api = 'accounts.files.insertFile';
	}

	if (to === 'project') {
		var api = 'drive.objects.insertObject';
	}

	stella.api.request({
		method : 'post',
		api : api,
		params : {
			file : {
				name : file.name,
				size : file.size
			}
		}
	}, function(result) {

		if (result.error) {
			stella.up.uploads[upload.id].status = 'error';
			stella.up.uploads[upload.id].error = result.error;
			console.error(error);
			console.info(stella.up.uploads[upload.id]);
			if (upload.onError) upload.onError(stella.up.uploads[upload.id]);
			return;
		}

		upload.status = 'initialized';

		if (to === 'account') {

			var account = result.data.account;
			localStorage.setItem('stellaAccount', JSON.stringify(account));

			var file = result.data.file;

			upload.objectID = null;
			upload.url = file.url;
			upload.key = file.key;
			upload.ext = file.ext;
			upload.credentials = file.credentials;

		}

		if (to === 'project') {

			var object = result.data.object;

			upload.objectID = object._id;
			upload.url = object.url;
			upload.key = object.key;
			upload.ext = object.ext;
			upload.credentials = object.credentials;

		}

		stella.up.uploads[upload.id] = upload;

		stella.up.uploadFile(stella.up.uploads[upload.id]);

		upload.onInit(stella.up.uploads[upload.id]);

		return;

	});

};
