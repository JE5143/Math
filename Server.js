var http = require('http');
var WebSocketServer = require('websocket').server;
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
    var message = msg.utf8Data;
    var pass = message['pass'];
    if (pass == 'PASSWORD') {
      var reqData = '{"boolean":"true"}'
      connection.send(reqData);
    } else {
      var reqData = '{"boolean":"false"}'
      connection.send(reqData);
    }
  });

  connection.on('close', function(data) {
    console.log("connection closed");
    connection.close();
  });
  connection.send('bruh');
});
