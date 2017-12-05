//PACKAGES AND CONFIGURATIONS
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://se3316:se3316@ds123956.mlab.com:23956/se3316_lab5', {
  useMongoClient: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000
});
const jwt = require('express-jwt');
const cors = require('cors');


//IMPORT MODELS
var PhotoCollection = require('./models/app/photoCollection');
var User     = require('./models/app/user');
var Auth     = require('./models/app/auth');
var Rating    = require('./models/app/rating');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


const authCheck = jwt({
  secret: new Buffer('AUTH0_SECRET', 'base64'),
  audience: 'AUTH0_CLIENT_ID'
});

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

router.route('/ratings')
    .post(function(req,res) {
        var rating = new Rating();
        rating.username = req.body.username;
        rating.collection_name = req.body.collection_name;
        rating.rating_value = req.body.rating_value;
        rating.collection_username = req.body.collection_username;

        rating.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'User saved!'});
        });
    })
    .get(function(req, res) {
        Rating.find(function(err, rating) {
            if (err)
                res.send(err);
            res.json(rating);
        })
    });

router.route('/photocollections')
    .post(function(req,res) {
        var photoCollection = new PhotoCollection();
        photoCollection.username = req.body.username;
        photoCollection.description = req.body.description;
        photoCollection.name = req.body.name;
        photoCollection.numberOfRatings = req.body.numberOfRatings;
        photoCollection.sumOfRatings = req.body.sumOfRatings;
        photoCollection.public = req.body.public;
        photoCollection.photos = req.body.photos;
        photoCollection.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'User saved!'});
        });
    })
    .get(function(req, res) {
        PhotoCollection.find(function(err, photoCollection) {
            if (err)
                res.send(err);
            res.json(photoCollection);
        })
    });

router.route('/photocollections/:user_id')
    .get(function(req, res) {
        PhotoCollection.findById(req.params.user_id, function(err, photoCollection) {
            if (err)
                res.send(err);
            res.json(photoCollection);
        });
    })

    .delete(function(req, res) {
        PhotoCollection.remove({
            _id: req.params.user_id
        }, function(err, photoCollection) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted course!' });
        });
    })

    .post(function(req, res) {
        PhotoCollection.findById(req.params.user_id, function(err, photoCollection) {
            if (err)
                res.send(err);
            var photoCollection = new PhotoCollection();
            photoCollection.username = req.body.username;
            photoCollection.description = req.body.description;
            photoCollection.name = req.body.name;
            photoCollection.numberOfRatings = req.body.numberOfRatings;
            photoCollection.sumOfRatings = req.body.sumOfRatings;
            photoCollection.public = req.body.public;
            photoCollection.photos = req.body.photos;
            console.log(req.body.photos+"hello");
            photoCollection.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'User updated!' });
            });

        });
    });

router.route('/auths')
    .post(function(req,res) {
        var auth = new Auth();
        auth.username = req.body.username;
        auth.token = req.body.token;
        auth.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Course saved!'});
        });
    })
    .get(function(req, res) {
        Auth.find(function(err, auth) {
            if (err)
                res.send(err);
            res.json(auth);
        })
    });

router.route('/users')
    .post(function(req, res) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.admin = req.body.admin;
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
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
