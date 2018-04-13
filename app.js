const express = require("express");
const bodyParser = require('body-parser');
const MongoClient = require("mongodb").MongoClient;
const validate = require('express-jsonschema').validate;
const leadSchema = require('./lead.js').leadSchema;
const route = require('./leadsResource.js').route;

const port = "1337";
const mongoUrl = "mongodb://mongo:27017";
const dbName = "leads";
const leadsCollection = "leads";

const app = express();
var db;
var server;

app.use(bodyParser.json());

app.on('ready', function() { 
    route(app, db, leadSchema, leadsCollection, validate);
    app.use(function(err, req, res, next) {
        var response;
        if (err.name === 'JsonSchemaValidation') {
            console.log("Validation error: ");
            console.log(err.validations);
            res.status(400);
             response = {
               statusText: 'Invalid lead object',
               jsonSchemaValidation: true,
               validations: err.validations
            };
            res.json(response);
        } else {
            next(err);
        }
    });
    server  = app.listen(port, function () {
        console.log("listening on port " + server.address().port);
    });
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








