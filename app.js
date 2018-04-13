const express = require("express");
const bodyParser = require('body-parser');
const MongoClient = require("mongodb").MongoClient;
const validate = require('express-jsonschema').validate;
const leadSchema = require('./lead.js').leadSchema;
const route = require('./leadsResource.js').route;
const app = express();

const port = "1337";
const mongoUrl = "mongodb://mongo:27017";
const dbName = "leads";
const leadsCollection = "leads";

var db;
var server;

app.on('ready', function() { 
    server  = app.listen(port, function () {
        console.log("listening on port " + server.address().port);
    });
});

app.get("/api/leads", function(req, res){
    db.collection(leadsCollection).find().toArray().then(function(result){
        res.status(200).json(result);
    });
});

app.post("/api/leads",  validate({body: leadSchema}), function(req, res){
    db.collection(leadsCollection).insertOne(req.body).then(function(){
        res.status(201).json(req.body);
    });
});

app.use(bodyParser.json());

app.use(function(err, req, res, next) {
    var responseData;
    if (err.name === 'JsonSchemaValidation') {
        console.log("Validation error: ");
        console.log(err.validations);
        res.status(400);
         responseData = {
           statusText: 'Invalid lead object',
           jsonSchemaValidation: true,
           validations: err.validations
        };
        res.json(responseData);
    } else {
        next(err);
    }
});

setTimeout(() => {
    MongoClient.connect(mongoUrl,
        {
            reconnectTries: 60,
            reconnectInterval: 1000
        },
        function (error, client){
        if (error){
            console.log("Error connecting to mongodb:");
            console.log(error);
        } else {
            console.log("Connected to mongodb!");
            db = client.db(dbName)
            app.emit('ready');
        }
    });
}, 5000);





