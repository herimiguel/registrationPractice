var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
    give: function(req,res) {
        User.find({}, function(err, users) {
            if (err) {
                console.log("There was an error loading all users.");
            } else {
                console.log(users);
                res.json(users);
            }
        });
    },
    create: function(req,res) {
        console.log(req.body);
        var newUser = new User();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        newUser.appointments = [];
        newUser.save(function(err) {
            if (err) {
                console.log(err);
                res.json(err);
            } else {
                // console.log(user);
                res.json(newUser);
            }
        });
    },

    login: function(req,res){
        var findEmail = req.body.email;
        console.log("login function")
        console.log(findEmail);
        User.findOne({email: findEmail}, function(err, user) {
            if (err) {
                console.log("There was an error finding this user.");
            } else {
                req.session.current_user = user;
                console.log("is user saving?");
                console.log(user);
                res.json(user);
            }
        });
    },
    current: function(req,res){
        console.log("current function");
        console.log(req.session.current_user);
        res.json(req.session.current_user);
    },
    logout: function(req,res){
        console.log("LOGGING OUT!!!");
        req.session.current_user = {};
        res.json([]);
    }
}