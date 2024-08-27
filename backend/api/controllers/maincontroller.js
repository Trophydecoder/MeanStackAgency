var providers = require("../models/providers.models");
const Provider = require("../db/db");
const { ObjectId } = require("mongodb");

//CRUD OPERATIONS(CREATE(post),  READ(get),  UPDATE(put),  DELETE(delete))//

//util functions//

//check if list has data//
function isEmptylist(obj) {
  return !obj || obj.length == 0 || Object.keys(obj).length == 0;
}
//handleError
function handleError(res, error) {
  res.status(200);
  res.send("Somnething is wrong .\n" + error);
}

module.exports.create = function (req, res) {
  try {
    var provider = req.body; //get provider
    Provider.create(provider)
      .then(result => {
        res.status(201);
        res.send(result);
      })
      .catch((error) => handleError(res, error));
  } 
  catch (error) {
    handleError(res, error);
  }
};
//getAll//
//url:/api/providers
module.exports.readAll = function (req, res) {
  try {
    Provider.find()
      .then(result => {
        if (isEmptylist(result)) {
          res.status(404);
          res.send("List is empty,Nothing to read");
        }
        else{
        res.status(200);
        res.send(result);
      }
      })
      .catch((error) => handleError(res, error));
  } 
  catch (error) {
    handleError(res, error);
  }
};
//GetOne//
//url:/api/providers/:id(123)
module.exports.readOne = function (req, res) {
  try {
    let id = ObjectId.createFromHexString(req.params.id);
    Provider.find({ '_id': id })
      .then(result => {
        if (isEmptylist(result)) {
          res.status(400);
          res.send("List is empty,Nothing to read");
        }
        else{
        res.status(200);
        res.send(result);
        }
      })
      .catch((error) => handleError(res, error));
  } catch (error) {
    handleError(res, error);
  }
};

//Put//
//url:/api/providers/:id(123)
module.exports.update = function (req, res) {
  try {
    let id = ObjectId.createFromHexString(req.params.id);
    let provider = req.body;
    Provider.findOneAndUpdate({'_id': id }, provider, { new: true })
      .then(result => {
        if (isEmptylist(result)) {
          res.status(404);
          res.send("List is empty,We cannot update");
        }
        else{
        res.status(200);
        res.send(result);
        }
      })
      .catch((error) => handleError(res, error));
  } catch (error) {
    handleError(res, error);
  }
};

//deleteONE//
//url:/api/providers/:id//
module.exports.deleteOne = function (req, res) {
  try {
    let id = ObjectId.createFromHexString(req.params.id);
    Provider.findOneAndDelete({ '_id': id })
      .then(result => {
        if (isEmptylist(result)) {
          res.status(404);
          res.send("List is empty Cannot delete");
        }
        else{
        res.status(200);
        res.send(result);
        }
      })
      .catch((error) => handleError(res, error));
  } catch (error) {
    handleError(res, error);
  }
};

//url:/api/providers//121
module.exports.deleteAll = function (req, res) {
  try {
    Provider.deleteMany({})
      .then((result) => {
        if (result.deletedCount === 0) {
          res.status(404);
          res.send("List is empty Cannot delete");
        }
        else{
        res.status(200);
        res.send("all providers deleted");
      }
      })
      .catch(error => handleError(res, error));
  } catch (error) {
    handleError(res, error);
  }
};
