const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const session = require('express-session')
var ObjectId = require('mongodb').ObjectID
var MongoDBStore = require('connect-mongodb-session')(session)

var db

app.set('port', (process.env.PORT || 3000))

MongoClient.connect('mongodb://nurse:medalert2018@ds123012.mlab.com:23012/medalert', (err, database) => {
    if (err) return console.log(err)
    db = database
    app.listen(app.get('port'), () => {
        console.log('listening on ' + app.get('port'))
    })
})

var store = new MongoDBStore(
    {
        uri: 'mongodb://nurse:medalert2018@ds123012.mlab.com:23012/medalert',
        collection: 'mySessions'
    });

// Catch errors
store.on('error', function (error) {
    assert.ifError(error);
    assert.ok(false);
});

app.use(require('express-session')({
    secret: 'This is a secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week in miliseconds
    },
    store: store,
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(bodyParser.json())


//Routes for Medications
app.get('/', (req, res) => {

    if (req.session.userId == null) {
        return res.render('login.ejs')
    } else {
        return res.redirect('/profile')  
    }
})

app.post('/medications', (req, res) => {

    var medication = req.body

    console.log("Medication created! User: " + req.session.userId)
    medication["userId"] = req.session.userId

    db.db('medalert').collection('medications').save(medication, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database')
        res.redirect('/profile')
    })

})
//  
app.delete('/medications', (req, res) => {  
    //console.log("pls, delete this medication: "+req.body.del_medication)
    db.db('medalert').collection('medications').deleteOne({ _id:  new ObjectId(req.body.del_medication) },
    (err, result) => {
      if (err) {return res.status(500).send(err)}
      return res.redirect('/profile')
    })
  })

//End of routes for medication

//Routes for user authentication
app.post('/', (req, res) => {
    // confirm that user typed same password twice
    if (req.body.password !== req.body.passwordConf) {
        return res.status(400).send('Passwords do not match.')
    }

    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {

        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            medications: []
        }

        db.db('medalert').collection('users').save(userData, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            } else {
                req.session.userId = result.id
                res.redirect('/')
            }
        })

    } else if (req.body.logemail && req.body.logpassword) {
        db.db('medalert').collection('users').findOne({ email: req.body.logemail }, (err, result) => {

            if (err) { return res.status(500).send(err) }
            else if (!result) {
                return res.status(401).send(err)
            }

            if (req.body.logpassword == result.password) {
                var userId = result._id
                console.log(userId)
                req.session.userId = userId
                res.redirect('/profile')
            } else {
                return res.status(500).send(err)
            }

        })

    } else {
        return res.status(500).send('All fields required.')
    }
})

app.get('/profile', (req, res) => {

    var userData = {}
    var medications = {}

    db.db('medalert').collection('users').findOne({ "_id": req.session.userId },
        (err, result) => {

            if (err) { return res.status(500).send(err) }
            else {
                if (result === null) {
                    return res.status(400).send('Not authorized! Go back!')
                } else {
                    var userDocument = result
                    userData = {
                        username: userDocument.username,
                        email: userDocument.email
                    }
                }
            }

        })

    db.db('medalert').collection('medications').find({ "userId": req.session.userId }).toArray((err, result) => {

        if (err) { return res.status(500).send(err) }
        else {
            if (result === null) {
                return res.status(400).send('Not authorized! Go back!')
            } else {
                var medications = result

                return res.render('index.ejs', { user: userData, medications: medications })
            }
        }
    })

})

app.get('/logout', (req, res) => {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return res.send(err)
            } else {
                return res.redirect('/')
            }
        });
    }
})
//End of the routes for authentication