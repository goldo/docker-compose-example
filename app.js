var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGO_URL + '/dockerdemo';
var db;

MongoClient.connect(url, function (err, database) {
    if(err) console.log(err);
    else {
      console.log("Connected correctly to server");
      db = database;
    }
});

app.use(bodyparser.json());
app.use(express.static('public'));

var insertDocument = function (db, document, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Insert some documents
    collection.insertOne(document, function (err, result) {
        callback(err, JSON.stringify(result.ops[0]));
    });
};

app.post('/hello', function (req, res) {
    var data = req.body;
    insertDocument(db, data, function(err, result) {
        res.status(201).send(result)
    })
});

app.get('/hello', function (req, res) {
    db.collection('documents').find().toArray(function (err, result) {
      if (err) {
	res.send(err);
      } else if (result.length) {
        res.send(JSON.stringify(result));
      } else {
        res.send('No document(s) found');
      }
   });
});

app.listen(8080);
