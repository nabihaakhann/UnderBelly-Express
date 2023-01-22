require('dotenv').config();
const   express = require('express'), 
        app = express(), 
        bodyParser = require('body-parser'), 
        mongoose = require('mongoose'), 
        bcrypt = require('bcrypt'), 
        saltRounds = 10;

// Establishing connection to DB
mongoose.connect(process.env.MONGO_URI, (err)=>{
    if(!err){
        console.log('Connection to DB established successfully');
    }
})

// Setting up body-parser
app.use(bodyParser.json());

// User Schema
// My orders and Reviews fields need to be designed
const User = mongoose.model('User', {
    email: String, 
    password: String, 
    contactNumber: Number, 
    address: String, 
    userImage: Buffer
})

// POST REQUESTS
app.post('/register', (req, res)=>{
    console.log(req.body);

    // Using Bcrypt to make Hash
    bcrypt.hash(req.body.password, saltRounds, (err, hash)=>{
        if(!err){
            console.log('Hash generated for ' + req.body.password + ' : ' + hash);

            // Saving user details to DB
            const newUser = new User({
                email: req.body.email, 
                password: hash, 
                contactNumber: '',
                address: '', 
                userImage: null
            })

            newUser.save(err => {
                if(!err){
                    console.log('User Details successfully saved to DB');
                    res.json({text: 'saved'});
                }
            });
        }
    })
})

app.listen(5000, ()=>{
    console.log('The Server is running on port 5000');
})