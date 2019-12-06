var http = require('http');
var WebsocketServer = require('websocket').server;
var fs = require("fs");

var server = http.createServer(function(req, res) {
  if (req.url == "/cookieclicker") {
            fs.readFile("./index.html", function (err, data2) {
                if (err) {
                    res.writehead(404);
                    res.write(err);
                    res.end();
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(data2);
                    res.end();
                }
            });
         } else {
            fs.readFile("./idk.html", function(error, data) {
                if (error) {  
                        res.writeHead(404);  
                        res.write(error);  
                        res.end();  
                    } else {  
                        res.writeHead(200, {  
                            'Content-Type': 'text/html'  
                        });  
                        res.write(data);  
                        res.end();  
                    } 
            });
         }
});
const port = process.env.PORT || 5000;
server.listen(port);
wsServer = new WebSocketServer({
  httpServer: server,
  keepAlive: 10000
});

wsServer.on('request', function(request) {
  var connection = request.accept(null, request.origin);
  console.log((new Date()) + ' Connection accepted.');
  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function(msg){
      console.log(msg.utf8Data);
  });

  connection.on('close', function(data) {
    console.log("connection closed");
    connection.close();
  });
  connection.send('bruh');
});
