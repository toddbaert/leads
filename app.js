const express = require("express");
const bodyParser = require('body-parser');
const MongoClient = require("mongodb").MongoClient;
const app = express();

var db;

// TODO config
const port = "1337";
const mongoUrl = "mongodb://172.17.0.2:27017";
const dbName = "leads";
const leadsCollection = "leads";


MongoClient.connect(mongoUrl, function (error, client){
    db = client.db(dbName)
});

app.use(bodyParser.json());

app.get("/api/leads", function(req, res){
    db.collection(leadsCollection).find().toArray().then(function(result){
        res.status(200).json(result);
    });
});

app.post("/api/leads", function(req, res){
    db.collection(leadsCollection).insertOne(req.body).then(function(){
        res.status(201).json(req.body);
    });
});

const server = app.listen(port, function () {
    console.log("listening on port " + server.address().port);
});