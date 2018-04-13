function route(app, db, leadSchema, validate){
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
}

module.exports = {
    route: route
};