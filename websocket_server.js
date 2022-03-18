const WebSocketServer = require('ws').Server; // WebSocket server integrated with Seminar5

const ws_server = new WebSocketServer({ port:8012 });  // standalone version
    
ws_server.on('headers', function(headers) {  // The object of HTTP headers
    ;
});
    
ws_server.on('connection', function(ws_client, request) {
    
    ws_client.on('message', function(message) {
        message = JSON.parse(message);  // convert message (JSON string) to an object {op:..., x:..., y:...}
        let rtnmsg = {};

        switch(message.op) {
            case 'addition':
                rtnmsg.op = 'addition';
                rtnmsg.result = Number(message.x) + Number(message.y);
                ws_client.send(JSON.stringify(rtnmsg));
                break;
            case 'subtraction':
                rtnmsg.op = 'subtraction';
                rtnmsg.result = Number(message.x) - Number(message.y);
                ws_client.send(JSON.stringify(rtnmsg));
                break;
            case 'multiplication':
                rtnmsg.op = 'multiplication';
                rtnmsg.result = Number(message.x) * Number(message.y);
                ws_client.send(JSON.stringify(rtnmsg));
                break;
            case 'division':
                rtnmsg.op = 'division';
                rtnmsg.result = Number(message.x) / Number(message.y);
                ws_client.send(JSON.stringify(rtnmsg));
                break;
            default:
                ws_client.send("command does not exist");
        }
    
    });
        
    ws_client.on('close', function(message) {
        console.log(message);
        ws_client.close();
    });

    ws_client.on('error', function(err) {
        console.log(err);
        ws_client.close();
    });

});
