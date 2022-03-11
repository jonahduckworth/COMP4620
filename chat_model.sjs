/* How to use
    var model = require('./chat_model.js');
    model.ready(function(result) {
        if (result)
            model.isValid(username, password, function(result) {
                ...
            });
    });
    model.ready(function(result) {
        if (result)
            model.exists(username, function(result) {
                ...
            });
    });
    ...
*/

var mongoClient = require("mongodb").MongoClient;

var conn;  // connection stub
var db;  // db stub
var connected = false;  // flag to see if a connection is made

function ready(cb) {
    if (connected) cb(true);
        
    else {
        mongoClient.connect('mongodb://jduckworth:jduckworth136@127.0.0.1:27017/COMP4620_jduckworth', function(err, connection) {
            if(err) cb(false);
                
            else {
                conn = connection;
                db = connection.db('COMP4620_jduckworth');
                connected = true;
                cb(true);
                console.log("connected");
            }
        });
    }
}

function close() {
    if (connected) {
        connected = false;
        conn.close();
    }
}

function exists(u, callback) {
    var collection = db.collection("Users");
    
    collection.find({ username:u }).toArray(function(err, results) { 
        if (err) callback(false);
        else if (results.length > 0) callback(true);
        else callback(false);
    });
}

function isValid(u, p, callback) {
    var collection = db.collection("Users");
    
    collection.find({ $and:[{ username:u }, { password:p }] }).toArray(function(err, results) {
        if (err) callback(false);
        else if (results.length > 0) callback(true);
        else callback(false);
    });
}

function register(u, p, e, callback) {
    var collection = db.collection("Users");
    
    exists(u, function(exists) {
        if(!exists) {
            collection.insertOne({ username:u, password:p, email:e }, function(err, docs) {
                if (err) callback(false);
                else callback(true);
            });
        } else callback(false);
    });
}

function unsubscribe(u, p, callback) {
    var collection = db.collection("Users");
    
    isValid(u, p, function(valid) {
        if(valid) { 
            collection.deleteOne({ username:u, password:p }, function(err, results) {
                if (err) callback(false);
                else if (results.deleteCount > 0) callback(true);
                else callback(false);
            });
        } else callback(true);
    });
}

exports.ready = ready;
exports.close = close;
exports.exists = exists;
exports.isValid = isValid;
exports.register = register;
exports.unsubscribe = unsubscribe;