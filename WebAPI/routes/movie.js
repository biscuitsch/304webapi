const express=require('express')
const route=express.Router()
const movie_controller = require('../controllers/movie')

const {validate, ValidationError} = require('express-json-validator')
const movieStructure = require('../models/movie').movieStructure


route.post('/create', validate(movieStructure), movie_controller.create)
route.get('/all', movie_controller.all)
route.get('/all/:keyword', movie_controller.keywordsearch)
route.put('/update', validate(movieStructure), movie_controller.update)

module.exports = route


route.use((err, req, res, next)=> {
    if(err){
        if(err instanceof ValidationError) {
            res.status(422).send({"status": 422, "description" : err.message})   
        } else {
            console.log("Error")
        }
    } else {
        next()
    }
})