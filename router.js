var url = require("url");
var fs = require("fs");
var path = require("path");
var tilde = require("tilde-expansion");
var querystring = require("querystring");
var events = require("events");
var req = new events.EventEmitter();

const proceed_with_resolved_pathname = function proceed_with_resolved_pathname(
  request,
  response,
  pathname
) {
  let fileordirname = path.basename(pathname);
  let words = fileordirname.split(".");
  let extension;

  if (words.length > 1) {
    // send back to client
    if (words[words.length - 1] == "html") {
      extension = words[words.length - 2] + "." + words[words.length - 1];
      console.log(extension);

      // read file
      fs.readFile(extension, "utf8", function (err, content) {
        if (!err) {
          response.writeHead(200, { "Content-type": "text/html" }); // 200: OK; important
          response.write(content);
          response.end();
        } else {
          response.end(
            "<html><body><h1>Not Found</h1><p>The requested URL was not found on this server.</p><hr></body></html>"
          );
        }
      });
    }
    // for .sjs file
    else if (words[words.length - 1] == "sjs") {
      extension = words[words.length - 2] + "." + words[words.length - 1];
      pathname = "./" + extension;
      console.log(pathname);

      let type = request.method;

      if (type == "GET") {
        // get the GET data
        var _GET = querystring.parse(decodeURI(url.parse(request.url).query));
        console.log("_GET: ", _GET);

        proceed_sjs(_GET, {}, pathname);
      }

      if (type == "POST") {
        // get the POST data
        var query = "";
        request.on("data", function (chunk) {
          query += chunk;
        });
        request.on("end", function () {
          var _POST = querystring.parse(query);
          console.log("_POST: ", _POST);

          proceed_sjs({}, _POST, pathname);
        });
      }
    }
  }

  function proceed_sjs(_GET, _POST, pathname) {
    try {
      var sjs = require(pathname);
      sjs.proceed(_GET, _POST, function (message) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(message.toString());
        response.end();
      });
    } catch (err) {
      console.log(err);
    }
  }
};

function route(request, response) {
  var pathname = decodeURI(url.parse(request.url).pathname);
  var words = pathname.split("/");

  // resolve pathname
  if (words[1][0] == "~") {
    console.log(words[1][0]);
    tilde(words[1], function (expanded) {
      var new_pathname = "/" + expanded + "/public_html";
      for (var i = 2; i < words.length; i++) {
        new_pathname += "/" + words[i];
      }
      console.log(new_pathname);
      proceed_with_resolved_pathname(request, response, new_pathname);
    });
  } else {
    var new_pathname = "/var/www/html" + pathname;
    console.log(new_pathname);
    proceed_with_resolved_pathname(request, response, new_pathname);
  }
}

exports.route = route;