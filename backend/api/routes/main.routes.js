var express = require('express');
var router = express.Router();
const mainController = require('../controllers/maincontroller')

//HTTP VERBS : POST,PUT,GET,DELETE//

//post providers//
router.post('/providers',mainController.create)

//get all providers//
router.get('/providers',mainController.readAll)

//get one provider/:id//
router.get('/providers/:id',mainController.readOne)

//put(edit):id//
router.put('/providers/:id',mainController.update)

//delete provider:id
router.delete('/providers/:id',mainController.deleteOne)

//delete provider//
router.delete('/providers',mainController.deleteAll)


module.exports= router