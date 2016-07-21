var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://db:27017/dockerdemo';
var db;

MongoClient.connect(url, function (err, database) {
    if(err) console.log(err);
    else {
      console.log("DB Connected correctly to the server");
      db = database;
    }
});

app.use(bodyparser.json());

var insertDocument = function (db, document, callback) {
    var collection = db.collection('documents');
    collection.insertOne(document, function (err, result) {
        callback(err, JSON.stringify(result.ops[0]));
    });
};

app.get('/', function(req, res) {
  res.send('/hello');
});

app.post('/hello', function (req, res) {
    var data = req.body;
    insertDocument(db, data, function(err, result) {
        res.status(201).send(result)
    })
});

app.get('/hello', function (req, res) {
    db.collection('documents').find().toArray(function (err, results) {
      if (err) {
        return res.send(err);
      } else if (results.length) {
        return res.send(JSON.stringify(results));
      } else {
        return res.send('No document(s) found');
      }
   });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Server is listening on port ', process.env.PORT || 3000);
});
