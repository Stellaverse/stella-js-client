


module.exports = function(obj, prefix) {

	var str = [], p;

	for (p in obj) {
		if (obj.hasOwnProperty(p)) {
			var k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
			str.push((v !== null && typeof v === 'object') ?
			stella.util.serialize(v, k) :
			encodeURIComponent(k) + "=" + encodeURIComponent(v));
		}
	}

	return str.join('&');

};
