var mongoose = require('mongoose');
var Story = mongoose.model('Story');

module.exports = {
    addStory: function(req, res) {
        var newStory = new Story();
        newStory.author = req.session.username;
        newStory.title = req.body.title;
        newStory.content = req.body.content;
        newStory.summary = req.body.summary;
        newStory.imageLink = req.body.imageLink;
        var lowercaseTitle = newStory.title.toLowerCase();
        var slug = lowercaseTitle.replace(/[^a-zA-Z0-9 ]/g, "");
        var addingHyphen = slug.replace(/\s+/g, '-');
        newStory.slug = addingHyphen;
        newStory.save(function(err, savedStory) {
            if (err) {
                return res.status(500).send();
            } else {
                res.redirect("/stories");
            }
        });
    },
    stories: function(req, res) {
        Story.find({}, function(err, stories) {
            res.render('home', {
                stories: stories,
                session: req.session
            });
        });
    },
    getStory: function(req, res) {
        var url = req.params.story;
        Story.findOne({
            slug: url
        }, function(err, story) {
            res.render('story', {
                story: story,
                session: req.session
            });
        });
    },
    saveComment: function(req, res) {
        var story_slug = req.params.slug;
        var comment = req.body.comment;
        var posted_date = new Date();
        Story.findOne({
            slug: story_slug
        }, function(err, story) {
            story.comments.push({
                body: comment,
                commented_by: req.session.username,
                date: posted_date
            });
            story.save(function(err, savedStory) {
                if (err) {
                    return res.status(500).send();
                } else {
                    res.render('story', {
                        story: story,
                        session: req.session
                    });
                }
            });
        });
    }
}
