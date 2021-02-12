var express = require('express');
var router = express.Router();
var usersignupSchema = require('../model/user.signup');
var appointmentSchema = require('../model/appointment.model');
const moment = require('moment');

router.post('/signup', async function(req, res, next) {
    const { name, mobileNo, address, email} = req.body;
    try{
        var existUser = await usersignupSchema.find({ mobileNo: mobileNo});
        if(existUser.length == 1){
            res.status(200).json({ IsSuccess: true, Data: [], Message: "User Already Exist" });
        }else{
            var user = await new usersignupSchema({
                name: name,
                mobileNo: mobileNo,
                address: address,
                email: email
            });
            if(user != null){
                user.save();
                res.status(200).json({ IsSuccess: true, Data: user, Message: "Successfully Registered"});
            }
        }
    } catch (error){
        res.status(500).json({ IsSuccess: false, Message: error.message });
    }
});

router.post('/login', async function(req, res, next) {
    try{
        var record = await usersignupSchema.find({ mobileNo: req.body.mobileNo });

        if(record.length == 1){
            res.status(200).json({ IsSuccess: true, Data: record, Message: "Successfully Login"});
        }else{
            res.status(200).json({ IsSuccess: true, Data: [], Message: "User Not Found !"});
        }
    }catch (error){
        res.status(500).json({ IsSuccess: false, Message: error.message });
    }
});

router.post('/updateInfo', async function(req, res, next){
    const{ id, name, mobileNo, email, address} = req.body;
    try{
        var existUser = await usersignupSchema.findByIdAndUpdate( id, {
            name: name,
            mobileNo: mobileNo,
            email: email,
            address: address
        });
        if(existUser != null){
            res.status(200).json({ IsSuccess: true, Data: 1, Message: "Updated Successfully!" });
        }else{
            res.status(200).json({ IsSuccess: true, Data: [], Message: "Updation Failed!" });
        }
    }catch (error){
        res.status(500).json({ IsSuccess: false, Message: error.message });
    }
});

router.post('/deleteUserInfo', async function(req, res, next){
    const{ userid } = req.body;
    try{
        var existUser = await usersignupSchema.deleteOne( userid );
        if(existUser){
            res.status(200).json({ IsSuccess: true, Data: 1, Message: "Delete Successfully!" });
        }else{
            res.status(200).json({ IsSuccess: true, Data: [], Message: "Delete Failed!" });
        }
    }catch (error){
        res.status(500).json({ IsSuccess: false, Message: error.message });
    }
});

//Book Appointment
router.post('/bookAppointment', async function(req, res, next){
    const{ name, email, mobileNo, city, age, message, date, time } = req.body;
    let dateTimeIs = moment().format('DD/MM/YYYY, h:mm:ss a').split(',');
    console.log(dateTimeIs);
    try {
        var existappointment = await appointmentSchema.find( {
            appointmentDateandTime: {
                date: date,
                time: time
            }
        });
        if(existappointment.length == 1){
            res.status(200).json({ IsSuccess: true, Data: [], Message: "Appointment Already Booked !" });
        }else{
            var appointmentBook = await new appointmentSchema({
                name : name,
                email: email,
                mobileNo: mobileNo,
                city: city,
                age: age,
                message: message,
                appointmentDateandTime: {
                    date: date,
                    time: time
                },
                dateTime: [dateTimeIs[0],dateTimeIs[1]]
            });
            // console.log(appointmentDate);
            if(appointmentBook != null){
                appointmentBook.save();
                res.status(200).json({ IsSuccess: true, Data: appointmentBook, Message: "Appointment Booked !" });
            }
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false, Message: error.message });
    }
});

module.exports = router;