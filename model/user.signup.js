var mongoose = require('mongoose');
var usersignupSchema = new mongoose.Schema({

    name:{
        type: String
    },
    mobileNo: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    }
    
});

module.exports = mongoose.model('user', usersignupSchema);