//PACKAGES AND CONFIGURATIONS
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var User     = require('./models/app/user');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://se3316:se3316@ds123956.mlab.com:23956/se3316_lab5', {
  useMongoClient: true,
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

//ROUTES
var router = express.Router();

router.use(function(req, res, next) { //middleware
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log('Something is happening.');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/users')
    .post(function(req, res) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.admin = req.body.admin;
        user.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Course saved!' });
        });
    })

    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });

router.route('/users/:user_id')
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })

    .put(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            user.username = req.body.username;
            user.password = req.body.password;
            user.admin = req.body.admin;
            User.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Course updated!' });
            });

        });
    })

    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted course!' });
        });
    });




//setting up app to use this router
app.use('/api', router);

//starting the server
app.listen(port);
console.log('Magic happens on port ' + port);
