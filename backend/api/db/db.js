const mongoose = require('mongoose')
const {Provider} = require('../models/provider')

//connect to uri mongo//
const uri ='mongodb://localhost:27017/provider_db'

//making connection(asynchronous//
mongoose.connect(uri)
    .then(result => {
    console.log('Connected successfuly!!')
    })
    .catch(error => console.log(error))


 

    module.exports = Provider