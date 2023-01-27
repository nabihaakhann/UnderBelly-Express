const { response } = require('express');

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
    let responseMessage = '';

    // Check if account already exists or not
    User.findOne({email: req.body.email}, (err, foundUser)=>{
        if(!err){
            if(!foundUser){
                responseMessage = 'Account Successfully Created!';

                // Using Bcrypt for creating a unique hash
                const hash = bcrypt.hashSync(req.body.password, saltRounds);
                console.log('Hash generated for ' + req.body.password + ' : ' + hash);

                // Saving user details to DB
                const newUser = new User({
                    email: req.body.email, 
                    password: hash, 
                    contactNumber: null,
                    address: null, 
                    userImage: null
                })

                newUser.save(err => {
                    if(!err){
                        console.log('User Details successfully saved to DB');
                    }
                });
            }
            else{
                responseMessage = 'Account already Exists!';
            }

            res.json({responseMessage: responseMessage});
        }
    })
})

app.post('/login', (req, res)=>{
    let responseMessage = '';

    // Check if account exists
    User.findOne({email: req.body.email}, async (err, foundUser)=>{
        if(!err){
            if(foundUser){
                // Check for password
                const match = await bcrypt.compare(req.body.password, foundUser.password);

                if(match){
                    responseMessage = 'Login Successfull!';
                }
                else{
                    responseMessage = 'Password Incorrect';
                }
            }
            else{
                responseMessage = 'No Such Account Found';
            }

            res.json({responseMessage: responseMessage});
        }
    }) 
})

app.listen(5000, ()=>{
    console.log('The Server is running on port 5000');
})