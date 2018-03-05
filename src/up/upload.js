



module.exports = function(upload) {

	if (!window.AWS) {
		console.error('[stella.js] The AWS SDK for Javascript v2.171.0 or greater is required to upload files using Stella Up.');
		console.info('[stella.js] Visit the following URL for installation instructions:');
		console.info('[stella.js] http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-the-jssdk.html');
		alert('You must install the AWS SDK v2.171.0 or greater to use Stella Up. See your console for more details.');
		return;
	}

	upload.id = stella.up.uploads.length;
	upload.status = 'initializing';
	upload.date = {
		initiated : new Date().getTime(),
		completed : 0
	};

	var account = stella.util.getActiveAccount();

	if (!account) {
		upload.status = 'error';
		upload.error = 'You Must Login To Upload A File';
		console.error('[stella.js] You must login to upload a file.');
		console.info(upload);
		upload.onError(upload);
		return;
	}

	stella.up.uploads.push(upload);

	stella.up.initializeUpload(upload);

	return;

};
