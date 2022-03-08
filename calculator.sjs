const proceed = function (_GET, _POST, callback) {
    if (_GET != undefined && _GET['op'] == 'addition') {
        var result = Number(_GET['x']) + Number(_GET['y']);
        callback(result);
    }
    if (_POST != undefined && _POST['op'] == 'addition') {
        var result = Number(_POST['x']) + Number(_POST['y']);
        callback(result);
    }
    if (_GET != undefined && _GET['op'] == 'subtraction') {
        var result = Number(_GET['x']) - Number(_GET['y']);
        callback(result);
    }
    if (_POST != undefined && _POST['op'] == 'subtraction') {
        var result = Number(_POST['x']) - Number(_POST['y']);
        callback(result);
    }
    if (_GET != undefined && _GET['op'] == 'multiplication') {
        var result = Number(_GET['x']) * Number(_GET['y']);
        callback(result);
    }
    if (_POST != undefined && _POST['op'] == 'multiplication') {
        var result = Number(_POST['x']) * Number(_POST['y']);
        callback(result);
    }
    if (_GET != undefined && _GET['op'] == 'division') {
        var result = Number(_GET['x']) / Number(_GET['y']);
        callback(result);
    }
    if (_POST != undefined && _POST['op'] == 'division') {
        var result = Number(_POST['x']) / Number(_POST['y']);
        callback(result);
    }
}

exports.proceed = proceed;
