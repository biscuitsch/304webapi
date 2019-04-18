const CONNECTION_URL = "mongodb+srv://abc:c8q7c8q7@cluster0-o37mu.azure.mongodb.net/test?retryWrites=true"
const DATABASE_NAME = "000"
const Mongodb = require('mongodb') 

var database, collection
var result = []

Mongodb.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        throw error
    }
    database = client.db(DATABASE_NAME)
    collection = database.collection("movie")
    console.log("Successfully to connect `" + DATABASE_NAME + "`!")
})

exports.create = function (req, res) {
    console.log("A new record is saved")
    collection.insertOne(req.body, function(err) {
        if(err){
            res.status(500).send({"status": 500, "description" : err})
        } 
        res.status(201).send({"status": 201, "description": "Data input successfully"})
    })
    
}

exports.all = function(req, res) {
    console.log("Someone get all movie data from the database")
    collection.find().toArray(function(err, docs){
        if(err){
            res.status(500).send({"status": 500, "description": err})
        } 
        res.send(docs)

    })
}

exports.keywordsearch = function(req, res) {
    console.log(`Keyword search detected with ${req.params.keyword}`)
    collection.find({$or: [{title: {$regex: req.params.keyword}}, {production: {$regex: req.params.keyword}}, {description: {$regex: req.params.keyword}}, {directors: {$regex: req.params.keyword}}, {imdbid: {$regex: req.params.keyword}}]}).toArray(function( err, docs) {
        if(err) {
            res.status(500).send({"status": 500, "description": err})
        }
        res.send(docs)
    })
}

exports.update = function(req, res) {
    console.log(`Some data are being updated by the Imdb-ID:${req.body.imdbid}`)
    collection.findOneAndUpdate({imdbid: req.body.imdbid}, {$set: req.body}, {}, function(err) {
        if(err) {
            res.status(500).send({"status": 500, "description": err})
        }
        res.status(201).send({"status": 201, "description": "Data update successfully"})
    })
}
