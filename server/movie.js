'use strict';
var util = require('./util.js');
var env = require('jsdom').env;
var fs = require('fs');

var url = 'http://movie.douban.com/ticket/100433911/';

util.get(url,function(content,status){

	env(content,function(err,window){
		var $ = require('jquery')(window);
		var rows = $('#seat_show_wp').find('tr');
		var elems = [];

		rows.each(function(index,row){
			var elem = [];
			$(row).find('td').each(function(index,col){
				var data = {};
				switch(col.className){
					case 'type_u':
					data.isSeat = false;
					break;

					case 'type_a':
					data.isSeat = true;
					data.seated = false;
					data.num = col.id;
					break;

					case 'type_b':
					data.isSeat = true;
					data.seated = true;
					data.num = col.id;
					break;
				};
				elem.push(data);
			});	
			elems.push(elem);
		});
		console.log(elems);

		fs.writeFile('movie.json',JSON.stringify({seats:elems}),function(err){
			console.log(err);
		});
	});
});