var http = require('http'),

fs = require('fs'),

url = require('url'),

rootFolder = '/views/';

var sys = require("sys");  



/*

http.createServer(function(req,res){  

    sys.puts("I got kicked");  

	res.writeHead(200, {'Content-Type': 'text/html'});

    fs.createReadStream('index.html').pipe(res);

    console.log(res);

	res.end();  

}).listen(80);  

sys.puts("Server Running on 80"); 





/*

http.createServer(function(req,res){  

    sys.puts("I got kicked");  

    res.writeHeader(200, {"Content-Type": "text/plain"});  

    res.write("Thiess Test");  

    res.end();  

}).listen(80);  

sys.puts("Server Running on 80"); 

*/





var path = require('path');

//console.log(path);



http.createServer(function (request, response) {

    console.log('request starting...');

	

	var filePath = '.' + request.url;

	if (filePath == './')

		filePath = './index.htm';

		

	var extname = path.extname(filePath);

	var contentType = 'text/html';

	switch (extname) {

		case '.js':

			contentType = 'text/javascript';

			break;

		case '.css':

			contentType = 'text/css';

			break;

	}

	

	path.exists(filePath, function(exists) {

	

		if (exists) {

			fs.readFile(filePath, function(error, content) {

				if (error) {

					response.writeHead(500);

					response.end();

				}

				else {

					response.writeHead(200, { 'Content-Type': contentType });

					response.end(content, 'utf-8');

				}

			});

		}

		else {

			response.writeHead(404);

			response.end();

		}

	});

	

}).listen(80);



