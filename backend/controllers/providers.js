const providers = require('../models/providers')

//list//
module.exports.list = function(req,res){
    res.render('providers/providers-list', 
    { title: 'ServiceProviders' ,providers : providers });
}
//details//
module.exports.details = function(req,res){
    let id = req.params.id
    let provider = providers.find(provider => provider.id == id)
    res.render('providers/providers-details', 
    {  id : id ,title: 'details' , company: provider.company });
}
//editform//
module.exports.edit = function(req,res){
    let id = req.params.id
    let provider = providers.find(provider => provider.id == id)
    res.render('providers/providers-edit', 
    {  id : id ,title: 'edit' , provider: provider});
}


module.exports.update = function(req,res){
    let id = req.params.id
    let provider = providers.find(provider => provider.id == id)
    provider.firstname = req.body.firstname;
    provider.lastname = req.body.lastname;
    provider.position = req.body.position;
    provider.company.company_name= req.body.company_name;
    provider.company.address= req.body.address;
    provider.company.address2= req.body.address2;
    provider.company.city= req.body.city;
    provider.company.state= req.body.state;
    provider.company.postal_code= req.body.postal_code;
    provider.company.email= req.body.email;
    provider.company.phone= req.body.phone;
    provider.company.description= req.body.description;
    provider.company.tagline= req.body.tagline;


    res.render('providers/providers-update', 
    {  id : id ,title: 'update' });
}

//addform//
module.exports.addform = function(req,res){
    res.render('providers/providers-add-form', {title: 'add' });
}

//addprovider//

module.exports.add = function(req,res){
    ///create random ID//
    let min = 100000
    let max = 999999
    let id = Math.floor(Math.random() * (max-min) + min)

//new provider object
let provider = {
    id :id,
    firstname :req.body.firstname,
    lastname : req.body.lastname,
    position: req.body.position,
    company :{
    company_name: req.body.company_name,
    address: req.body.address,
    address2: req.body.address2,
    state: req.body.state,
    postal_code:req.body.postal_code,
    email: req.body.email,
    phone: req.body.phone,
    description: req.body.description,
    tagline: req.body.tagline
    }
}
//pushing new provider to PROVIDERS//
    providers.push(provider)
    res.render('providers/providers-add', 
    {  id : id ,title: 'added' });
}

//delete a provider//
module.exports.delete = function(req,res){
    let id = req.params.id
    let provider = providers.find(provider => provider.id == id)
    let company = provider.company.company_name
    let idx = providers.indexOf( providers.find(provider => provider.id == id))

    //remove  the element at the index of idx
    providers.splice(idx,1)
    
    res.render('providers/providers-delete', 
    {  id : id ,title: 'delete' , company: company});
}