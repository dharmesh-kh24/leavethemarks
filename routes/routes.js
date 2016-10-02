module.exports = {
    index: function(req, res) {
        res.render('index', {
            session: req.session
        })
    },
    login: function(req, res) {
        res.render('login')
    },
    register: function(req, res) {
        res.render('register')
    },
    newStory: function(req, res) {
        if (req.session.loggedIn !== true) {
            res.redirect('/login');
        } else {
            res.render('new-story', {
                session: req.session
            });
        }

    }
}
