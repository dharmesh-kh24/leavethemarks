var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/leavethemarks';
var bcrypt = require('bcrypt');

mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String
})

userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    } else {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err)
            } else {
                bcrypt.hash(user.password, salt, function(err, hash) {
                    if (err) {
                        return next(err)
                    }
                    user.password = hash;
                    next();
                })
            }
        })
    }
})
userSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) {
            return callback(err);
        } else {
            return callback(null, isMatch);
        }
    })
}


mongoose.model('User', userSchema);
