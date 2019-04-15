


module.exports = function(request, callback) {

	stella.config.api.request.events.init(request);

	request.method = request.method.toLowerCase() || 'get';
	request.url = request.url || stella.config.api.url;
	request.version = request.version || stella.config.api.version;

	request.projectID = request.projectID || stella.config.projectID;

	if (!request.projectID) {
		alert('ERROR:\n\nYou must provide a projectID with the request, or in the config.');
		return;
	}

	request.auth = request.auth || {};
	request.auth.session = localStorage.getItem('stella-session');

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
		console.log('[stella-js-client] XHR ERROR: Unable to contact ' + stella.config.api.url + '.');
		console.log('[stella-js-client] REQUEST:');
		console.log(request);
		console.log('[stella-js-client] ERROR:');
		console.log(event);
		request.xhrError = event;
		stella.config.api.request.events.networkError(request);
	});

	xhr.addEventListener('load', function(event) {

		var result = JSON.parse(event.target.response);

		if (result.auth) {
			localStorage.setItem('stella-session', result.auth.session);
		}

		if (result.error) {
			stella.config.api.request.events.error(result);
		} else {
			stella.config.api.request.events.success(result);
		}

		if (callback) return callback(result);

	});

	stella.config.api.request.events.beforeSend(request);

	xhr.open(request.method, request.url, true);
	xhr.setRequestHeader('Stella-Api', request.api);
	xhr.setRequestHeader('Stella-Api-Version', request.version);
	xhr.setRequestHeader('Stella-Project-Id', request.projectID);
	xhr.setRequestHeader('Stella-Auth', btoa(JSON.stringify(request.auth)));
	xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	xhr.send(body);

};
