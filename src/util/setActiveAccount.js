


module.exports = function(account) {

	localStorage.setItem('stellaAccount', JSON.stringify(account));

	return true;

};
