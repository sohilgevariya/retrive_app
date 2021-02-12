var mongoose = require('mongoose');
var appointmentSchema = new mongoose.Schema({

    name: {
        type: String
    },
    email: {
        type: String
    },
    mobileNo: {
        type: String
    },
    city: {
        type: String
    },
    age: {
        type: String
    },
    message: {
        type: String
    },
    appointmentDateandTime: {
        date: {
            type: String
        },
        time: {
            type: String
        }
    },
    dateTime: [
        {
            type: String,
            default: ''    
        }
    ]
});

module.exports = mongoose.model("Appointment", appointmentSchema);