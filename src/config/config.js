


module.exports = {
	api : {
		url : 'https://api.stellaverse.com',
		version : 1,
		request : {
			events : {
				init : function() { return false; },
				beforeSend : function() { return false; },
				networkError : function() { return false; },
				error : function() { return false; },
				success : function() { return false; }
			}
		}
	},
	bucket : 'cdn.stellaverse.com',
	recaptcha : {
		key : '6LeZ6RMTAAAAAFaHzXK76s60uMlBlKzSe5NsWUL1'
	}
};
