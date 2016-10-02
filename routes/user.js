var mongoose = require('mongoose');
var User = mongoose.model('User');
module.exports = {
    createUser: function(req, res) {
        var newUser = new User();
        newUser.username = req.body.username;
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        newUser.save(function(err, savedUser) {
            if (err) {
                res.render('register', {
                    errorMessage: 'User already exists with given username or email'
                })
            } else {
                req.session.newuser = savedUser.username;
                res.render('new-user', {
                    session: req.session
                })
            }
        })
    },
    login: function(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        User.findOne({
            email: email
        }, function(err, user) {
            if (user == null) {
                res.render('login', {
                    errorMessage: "Email does not exist"
                })
                return;
            } else {
                user.comparePassword(password, function(err, isMatch) {
                    if (isMatch == true) {
                        req.session.username = user.username;
                        req.session.loggedIn = true;
                        res.render("new-story", {
                            session: req.session
                        });
                    } else {
                        res.render("login", {
                            errorMessage: "Invalid password"
                        });
                        return;
                    }
                })
            }
        })
    },
    logout:function(req,res){
      var loggedOutUser=req.session.username;
      req.session.destroy();
      res.render('logout',{
        loggedOutUser:loggedOutUser
      })
    }
}
