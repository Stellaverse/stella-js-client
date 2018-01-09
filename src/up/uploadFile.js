



stella.up.uploadFile = function(upload) {

	var bucket = upload.bucket || stella.config.bucket;

	var credentials = new AWS.Credentials({
		accessKeyId : upload.credentials.AccessKeyId,
		secretAccessKey : upload.credentials.SecretAccessKey,
		sessionToken : upload.credentials.SessionToken
	});

	AWS.config.region = 'us-east-1';

	var s3 = new AWS.S3({
		credentials : credentials,
		maxRetries : 100,
		params : {
			Bucket : bucket
		}
	});

	stella.up.uploaders[upload.id] = s3.upload({
		Key : upload.key,
		ACL : 'private',
		ContentType : upload.file.type,
		ContentLength : upload.file.size,
		Body : upload.file,
		ServerSideEncryption : 'AES256'
	});

	stella.up.uploaders[upload.id].on('httpUploadProgress', function(event) {

		var total = event.total;
		var loaded = event.loaded;
		var percent = loaded / total * 100;

		var now = new Date().getTime();
		var started = stella.up.uploads[upload.id].date.initiated;
		var elapsed = now - started;
		var rate = '0Mbps';
		var remaining = '0:00:00';

		stella.up.uploads[upload.id].status = 'uploading';
		stella.up.uploads[upload.id].loaded = loaded;
		stella.up.uploads[upload.id].total = total;
		stella.up.uploads[upload.id].percent = percent;
		stella.up.uploads[upload.id].rate = rate;
		stella.up.uploads[upload.id].remaining = remaining;

		upload.onProgress(stella.up.uploads[upload.id]);

		return;

	});

	stella.up.uploaders[upload.id].send(function(error, result) {

		if (error) {
			stella.up.uploads[upload.id].status = 'error';
			stella.up.uploads[upload.id].error = error;
			console.error('[stella.js] Upload error, please try again.');
			upload.onError(stella.up.uploads[upload.id]);
		} else {
			stella.up.uploads[upload.id].status = 'uploaded';
		}

		stella.up.finalizeUpload(stella.up.uploads[upload.id]);

		return;

	});

};
