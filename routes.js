var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
const sendmail = require('sendmail')();
var mongojs = require('mongojs');
var db = mongojs('hotel', ['hotel']);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.json())
app.set('view engine', 'ejs');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var base64ToImage = require('base64-to-image')
var secretKey = 'rtdcfvbtygfbytgfvcregdfgvbtyfvgbytHJG!@gbnyuhvgtyhgjbJYBVhjdbyujhgbhjH121V1HJB1HG2GBH2'
var mongoose = require('mongoose');
var Schema = mongoose.Schema
adminEmail = 'abhiarora1138@gmail.com'
hotelEmail = 'abhiarora1137@gmail.com'

var rooms = new Schema({
    room: Number,
    availableStatus: String
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Autherization', true);
    next();
});
var all = Number

app.post('/editRoom', (req, res)=>{
    db.rooms.update({"roomNumber": req.body.roomNumber }, {$set: {"RoomPrice": req.body.RoomPrice, "beds": req.body.beds, "status": req.body.status, 'image': req.body.image} }, (err, docs)=>{
        db.rooms.findOne({"roomNumber": req.body.roomNumber }, (err, docs)=>{
            if(docs){
                res.send(docs)
            }else {
                res.send(err)
            }
            
        })
    })
})

app.post('/customerDetails', (req, res) => {
    console.log(req.body.roomNumber)
    db.customerDetails.find({ 'roomId': req.body.roomNumber }, (err, docs1) => {

        res.send(docs1)
    })
})

app.post('/addRooms', (req, res) => {
    if (req.body)

        db.rooms.findOne({ 'roomNumber': req.body.roomNumber }, (err, result) => {
            if (result) {
                console.log('Room already exsist')
                res.json({
                    result: "Room number Already Registered"
                })
            } else {
                db.rooms.insert(req.body, (err, docs) => {
                    res.send(docs)
                })
            }
        })
});

app.post('/bookRoom', (req, res) => {
    db.rooms.update({ 'roomNumber': req.body.roomId }, { $set: { 'status': 'Booked' } }, (err, docs1) => {
        db.customerDetails.insert(req.body, (err, docs) => {
            res.send(docs);
        })
    })
})

app.post('/adminAuth', (req, res) => {
    console.log(req.body)
    db.customerDetails.findOne({ 'roomId': req.body.roomID.roomId }, (err, docs) => {
        res.send([docs]);
        console.log(docs)
    })
})

app.post('/checkOut', (req, res) => {
    console.log(req.body)
    db.customerDetails.remove({ 'roomId': req.body.roomId }, (err, docs) => {
        db.customerCost.remove({ 'roomId': req.body.roomId }, (err, docs) => {
            db.rooms.update({ 'roomNumber': req.body.roomId }, { $set: { "status": "Available" } }, (err, docs) => {
                res.send("CheckOut done");
            })
        })
    })
})

app.get('/allRooms', (req, res) => {
    db.rooms.find((err, docs) => {
        res.send(docs);
    })
})

app.post('/customer', (req, res) => {
    // console.log(req.body)
    db.customerDetails.find(req.body, (err, docs) => {
        res.send(docs)
    })
})

app.get('/roomDetails', (req, res) => {
    db.rooms.find({ 'roomNumber': req.body.roomId }, (err, docs) => {
        res.send(
            docs,
        )
    })
})
app.post('/removeRoom', (req, res) => {
    db.rooms.remove({ 'roomNumber': req.body.roomNumber }, (err, docs) => {
        if (docs) {
            res.json({
                docs
            })
        }
        else {
            res.send(err)
        }
    })
})

app.post('/roomStatus', (req, res) => {
    db.rooms.find({ 'status': req.body.status }, (err, docs) => {
        res.send(
            docs
        )
    })
})

function vaildPassword(password, Password) {
    return bcrypt.compareSync(password, Password)
}

app.post('/hotelLogin', (req, res) => {
    db.hotelLogin.findOne({ 'email': req.body.email }, (err, result) => {
        var jemail = {
            userEmail: req.body.email
        }
        if (!result) {
            res.json({
                message: false
            })
        } else if (result.type && vaildPassword(req.body.password, result.password)) {
            jwt.sign({ jemail }, secretKey, (err, token) => {
                res.json({
                    login: 'Owner LoggedIn',
                    token
                })

            })

        } else if (vaildPassword(req.body.password, result.password)) {
            jwt.sign({ jemail }, secretKey, (err, token) => {
                res.json({
                    login: 'Staff LoggedIn',
                    token
                })
               })
        }
        else if (req.body.password != result.password) {
            res.json({
                wpassword: 'Wrong Password'
            })
        };
    })
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403);
    }
}

app.post('/sendEmail', (req, res) => {

    sendmail({
        subject: 'Hi   ' + req.body.customerName,
        from: hotelEmail,
        to: [req.body.email, adminEmail],
        text: `Hi ` + req.body.customerName + ` Thanks for your Booking your room number is ` + req.body.roomId

    }, function (err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
    });
    res.send({
        'message': "Email Sent"
    })

})

app.post('/addLodge', (req, res) => {
    db.customerCost.insert(req.body, (err, docs) => {
        res.send("Lodge Provided");
    });
});

app.post('/totalAmount', (req, res) => {
    db.customerCost.find({ "roomId": req.body.roomId.roomId }, (err, docs) => {
        res.send(docs)
    })
})

app.post('/getDetailByDate', (req, res) => {
    console.log(req.body)   
    db.customerDetails.find({
                    $or:[{"entryDay":{"hours": 23,"date": req.body.date,"year": req.body.year, "month": req.body.month}},
                          {"entryDay":{"hours": 23,"date": req.body.date1,"year": req.body.year1, "month": req.body.month1}}
                ]
                // "entryDay": {$lt: }
                // "entryDay":{"hours": 23,"date": req.body.date,"year": req.body.year, "month": req.body.month}
    },(
        
        (err, docs) => {

            if (docs != null) {
                res.send(docs)
                console.log(docs)
            } else if(!docs){
                res.send('Room Details Not found');
                console.log(docs)
            }
        })
    )
})

app.listen(2100, () => { console.log('App is listning port 2100') })

