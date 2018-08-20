var mongoose = require('mongoose');
var User = mongoose.model('User');
var Appointment = mongoose.model('Appointment');

module.exports = {
    make: function(req,res){
        User.findOne({_id: req.session.current_user._id}, function(err,user){
            console.log("enter appointment creation");
            // console.log(user);
            console.log(req.body.complaint);
            var apt = new Appointment();
            apt.patient = req.session.current_user;
            console.log(apt.patient);
            apt.complaint = req.body.complaint;
            apt.datetime = req.body.datetime;
            apt.patientName = req.session.current_user.name;
            user.appointments.push(apt);
            apt.save(function(err, appt){
                if (err) {
                    console.log(err);
                } else {
                    user.save(function(err, users){
                        console.log(users);
                    if (err) {
                            console.log(err);
                            res.json(err);
                        } else {
                            console.log("********");
                            console.log(apt)
                            res.json(apt);
                        } 
                    });
                }
            });
        });
    },

    give: function(req,res){
        Appointment.find({}).sort('datetime').exec(function(err, apts) {
            if (err) {
                console.log("Errors loading users.");
            } else {
                res.json(apts);
            }
        });
    },
    destroy: function(req,res){
        console.log(" destroying function inside");
        console.log(req.body);
        Appointment.remove({_id: req.body.id}, function(err){
            if (err) {
                console.log(err);
                res.json(err);
            } else {
                res.json([]);
            }
        });
    }
}
