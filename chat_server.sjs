var model = require('./chat_model.sjs');

function proceed(_GET, _POST, callback)
{
    if (_POST['command'] == undefined)
        callback("No command");
    
    else
        switch (_POST['command']) {
        case 'signin': 
            model.ready(function() {
                model.isValid(_POST['username'], _POST['password'], function(result) {
                    if (result)
                        callback("succesfully signed in");
                    else 
                        callback("invalid username/password");
                });
            });
            console.log("succesful sign in");
            break;
        case 'join': 
            model.ready(function() {
                model.register(_POST['username'], _POST['password'], _POST['email'], function(result) {
                    if (!result)
                        callback("username already exists");
                        
                    else 
                        callback("succesfully joined");
                });
            });
            console.log("succesful join");
            break;
        case 'unsubscribe': 
            model.ready(function() {
                model.unsubscribe(_POST['username'], _POST['password'], function(result) {
                    if (result)
                        callback("invalid username/password");
                    else 
                        callback("sucessfully unsubscribed");
                });
            });
            console.log("succesful unsubscribe");
            break;
        default:
            callback('Unknown command - ' + _POST['command']);
            break;
        }
}

exports.proceed = proceed;