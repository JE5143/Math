function login() {
  var pass = prompt('password');
  if (pass == "") {
    alert("Denied login");
  } else if (pass) {
    var connection = new WebSocket('wss://cookieclickers.herokuapp.com');
    connection.onopen = function () {
      connection.send("Hello server!");
      var requestData = {"pass":pass}
      connection.send(requestData);
      console.log('opened websocket');
      alert("ws opened");
    };
    connection.onerror = function (error) {
      console.log('a data sending error occured:' + error);
    };
    connection.onmessage = function (message) {
      var data = JSON.parse(message.data);
      var GoodLogin = data['boolean'];
      if (GoodLogin = true) {
        alert("Successful Login");
        showHax();
      } else {
      }
    };
  } else {
    alert("Denied login");
  }
}


