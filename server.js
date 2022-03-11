var PORT_NO = 8012;
var http = require("http");

function start(router) {
  var server = http.createServer(function (request, response) {
    // request: from the client; response: to the client
    router.route(request, response);
  });
  server.listen(PORT_NO);
}

exports.start = start;
