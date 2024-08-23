const mongoose = require('mongoose')

//definining a schema
const Schema = mongoose.Schema

//company schema(child-document)
const companySchema = new Schema({
        "company_name":{type :String, required:true},
        "address": {type :String, required:true},
        "address2":String,
        "city": {type :String, required:true},
        "state": {type :String, required:true, min:2 ,max:2},
        "postal_code": {type :String, required:true , min:5},
        "phone": {type :String, required:true},
        "email":{type :String, required:true},
        "description":String,
        "tagline":String
})
//providers providers(top level)(parent-document)
const providerSchema = new Schema({
    "firstname":{type :String, required:true},
    "lastname": {type :String, required:true},
    "position":String,
     "company": companySchema
})

module.exports ={companySchema , providerSchema}