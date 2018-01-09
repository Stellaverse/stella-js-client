


stella.api.request = function(request, callback) {

	request.method = request.method.toLowerCase() || 'get';
	request.url = request.url || stella.config.api.url;
	request.version = request.version || stella.config.api.version;

	request.projectID = request.projectID || stella.config.projectID;

	request.auth = request.auth || {};
	request.auth.session = localStorage.getItem('stellaSession');

	if (request.method === 'get') {
		request.url += '/' + request.projectID;
		request.url += '/' + request.api.replace(/\./g,'-') + '/';
		request.url += '?' + stella.util.serialize(request.params);
		var body = null;
	}

	if (request.method === 'post') {
		var body = JSON.stringify(request);
	}

	var xhr = new XMLHttpRequest();

	xhr.addEventListener('error', function(event) {
		request.xhrError = event;
		console.log('[stella.js] XHR ERROR: Unable to contact ' + stella.config.api.url + ' due to network error');
		console.log(request);
	});

	xhr.addEventListener('load', function(event) {

		var result = JSON.parse(event.target.response);

		if (result.auth) {
			localStorage.setItem('stellaSession', result.auth.session);
		} else {
			localStorage.removeItem('stellaSession');
		}

		if (callback) return callback(result);

	});

	xhr.open(request.method, request.url, true);
	xhr.setRequestHeader('Stella-Api', request.api);
	xhr.setRequestHeader('Stella-Api-Version', request.version);
	xhr.setRequestHeader('Stella-Project-Id', request.projectID);
	xhr.setRequestHeader('Stella-Auth', btoa(JSON.stringify(request.auth)));
	xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	xhr.send(body);

};
