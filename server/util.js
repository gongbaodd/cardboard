var http = require('http');
var request = require('request');

var Util = function(){};
Util.prototype.get = function(url,callback){
	request(url,function(err,response,body){
		if(!err && response.statusCode == 200){
			callback(body,response.statusCode);
		}
	});
};

module.exports = new Util();