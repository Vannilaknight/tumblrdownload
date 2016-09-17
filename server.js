var express = require('express');
var request = require('request');
var app = express();

var tumblr = require('tumblr.js');
var client = tumblr.createClient({
    consumer_key: '4uSt3xUhMCLZt0iv6w0WXF9PtQTEJLgZIZrHsy7iVx73ZnN6ti',
    consumer_secret: 'RMfW9MFYxnKVi4q5lK9DEU7g4JeVYSUdcbX69Ga7ZtjEtMkxgS',
    token: 'DFgkPxLTo1bcGn32bMVlkhmV6lEScWfiCiuRHtYYEg5aZQgRfy',
    token_secret: 'qEKAzxZlY3BWL0tMhlq6wNhs9HYdYRXVK3avx1nCfFjrvEDFov'
});

app.get('/getLikes', function (req, res) {
    client.blogLikes(req.param('user') + '.tumblr.com', {limit: 100}, function (err, data) {
        var posts = data.liked_posts;
        var urls = "";
        var count = 0;
        posts.forEach(function (post) {
            if (post.type === 'photo') {
                post.photos.forEach(function(photo) {
                    if (photo) {
                        var url = photo.original_size.url;
                        urls += "<img width='200' src=\"" + url + "\" />";
                    }
                });
            }
        });
        res.send(urls);
    });
});

app.listen(3030, function () {
    console.log('Example app listening on port 3030!');
});