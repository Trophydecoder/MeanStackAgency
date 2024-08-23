const mongoose = require('mongoose')
const {providerSchema} = require('../schemas/provider.schema')


//creating a provider model//
const Provider = mongoose.model('Provider',providerSchema)

module.exports = { Provider }