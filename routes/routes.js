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
    }
}
