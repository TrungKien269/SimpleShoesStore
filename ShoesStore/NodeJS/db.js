const mongoose = require('mongoose');
mongoose.connect('mongodb://shoesstore:Hw2f_-pBxQMf@den1.mongo1.gear.host:27001/shoesstore', 
{ useNewUrlParser: true }, (err) =>{
    if(!err){
        console.log("MongoDB connect successfull.");
    }
    else{
        console.log("Error in database connection: " + JSON.stringify(err, undefined, 2));
    }
});
module.exports = mongoose;