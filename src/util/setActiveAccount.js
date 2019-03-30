


module.exports = function(account) {

	localStorage.setItem('stella-account', JSON.stringify(account));

	return true;

};
