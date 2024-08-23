var providers = require("../models/providers.models");
const Provider = require("../db/db");
const {ObjectId} = require('mongodb')
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

// //function to check if there ID we generated doesnt exist//
// function  existProvider(id){
// return providers.find(provider => provider.id==id)

// }
//generateUniqueID function//
// function getUniqueID(providers){
//      ///create random ID//
//      let min = 100000
//      let max = 999999
//      do{
//      var id = Math.floor(Math.random() * (max-min) + min)
//      }while (existProvider(id)) ;
//      return id;
// }

//post
//url:/api/providers
module.exports.create = function (req, res) {
  ///create random ID//
  if (isEmptylist(providers)) {
    providers = [];
  }
  var id = req.body.id;
  if (existProvider(id)) {
    res.status(400);
    res.send("Duplicate ID is not allowed");
    id = getUniqueID(); //getNewID//
  }

  var provider = req.body; //get new provider
  provider.id = id;

  //pushing new provider to PROVIDERS//
  providers.push(provider);
  res.status(200);
  res.send(provider);
};
//getAll//
//url:/api/providers
module.exports.readAll = function (req, res) {
  try {
    Provider.find()
      .then((result) => {
        if (isEmptylist(result)) {
          res.status(404);
          res.send("List is empty");
        }
        res.status(200);
        res.send(result);
      })
      .catch((error) => handleError(res, error));
  } catch (error) {
    handleError(res, error);
  }
};
//GetOne//
//url:/api/providers/:id(123)
module.exports.readOne = function (req, res) {

    try{
      let id = new ObjectId(req.params.id);
      Provider.find({'_id':id})
        .then(result =>{
            if (isEmptylist(result)) {
                res.status(404);
                res.send("List is empty");
              }
            
            //  let provider = providers.find((provider) => provider.id == id)
              res.status(200);
              res.send(result);
        })
        .catch((error) => handleError(res, error));
    } 
    catch (error) {
      handleError(res, error);
    }
  }



//Put//
//url:/api/providers/:id(123)
module.exports.update = function (req, res) {
  if (isEmptylist(providers)) {
    res.status(404);
    res.send("List is empty,We cannot update");
  }
  let id = req.params.id;
  let provider = providers.find((provider) => provider.id == id);
  provider.firstname = req.body.firstname;
  provider.lastname = req.body.lastname;
  provider.position = req.body.position;
  provider.company.company_name = req.body.company.company_name;
  provider.company.address = req.body.company.address;
  provider.company.address2 = req.body.company.address2;
  provider.company.city = req.body.company.city;
  provider.company.state = req.body.company.state;
  provider.company.postal_code = req.body.company.postal_code;
  provider.company.email = req.body.company.email;
  provider.company.phone = req.body.company.phone;
  provider.company.description = req.body.company.description;
  provider.company.tagline = req.body.company.tagline;

  res.status(200);
  res.send(provider);
};

//deleteONE//
//url:/api/providers/:id//
module.exports.deleteOne = function (req, res) {
  if (isEmptylist(providers)) {
    res.status(404);
    res.send("List is empty Cannot delete");
  }
  let id = req.params.id;
  let provider = providers.find((provider) => provider.id == id);
  let idx = providers.indexOf(provider);

  //remove  the element at the index of idx
  providers.splice(idx, 1);
  res.status(200); //.res status 400//
  res.send(provider);
};

//url:/api/providers//
module.exports.deleteAll = function (req, res) {
  if (isEmptylist(providers)) {
    res.status(404);
    res.send("List is empty Cannot delete");
  }
  providers = [];
  res.status(200);
  res.send("all providers deleted");
};
