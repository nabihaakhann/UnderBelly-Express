const { response } = require('express');
const { join } = require('path');

require('dotenv').config();
const   express = require('express'), 
        app = express(), 
        bodyParser = require('body-parser'), 
        mongoose = require('mongoose'), 
        bcrypt = require('bcrypt'), 
        saltRounds = 10, 
        multer = require('multer'),
        fs = require('fs');

// Establishing connection to DB
mongoose.connect(process.env.MONGO_URI, (err)=>{
    if(!err){
        console.log('Connection to DB established successfully');
    }
})

// Setting up body-parser
app.use(bodyParser.json());

// Setting up Multer
const upload = multer({storage: multer.memoryStorage()});

// User Schema
// My orders and Reviews fields need to be designed
const User = mongoose.model('User', {
    email: String, 
    password: String, 
    contactNumber: Number,
    registrationNumber: String, 
    addresses: [
        {
            address: String, 
            default: Boolean
        }
    ], 
    userImage: Buffer, 
    userImageType: String,
    userLevel: String,
    itemsRated: [String]
})
const Product = mongoose.model('Product', {
    category: String, 
    items: [
        {
            name: String, 
            description: String, 
            price: Number, 
            filterTags: [String], 
            itemImage: Buffer,
            imageType: String, 
            userRatings: [
                {
                    rating: Number, 
                    userId: String
                }
            ],
            currentRating: Number
        }
    ]
})

// GET REQUESTS

// Home Page
app.get('/categories/:category', (req, res)=>{
    console.log(req.params);

    Product.findOne({category: req.params.category}, {items: 1}, (err, foundCategory)=> {
        if(!err){
            const response = {
                success: false, 
                items: null
            }

            if(foundCategory){
                response.success = true;
                
                // Base encoding images 
                response.items = foundCategory.items.map((item)=> {
                    return {
                        name: item.name, 
                        description: item.description, 
                        price: item.price, 
                        currentRating: item.currentRating,
                        filterTags: item.filterTags, 
                        itemImage: item.itemImage.toString('base64'), 
                        _id: item._id
                    }
                })

                console.log('Items in ' + req.params.category + ' sent back to client');
            }
            else{
                console.log(`Category: ${req.params.category} not Found!`);
            }

            res.json(response);
        }
    })
})

app.get('/:userId/userData', (req, res)=>{
    console.log(req.params);

    const response = {
        userData: null
    }
    User.findById(req.params.userId, {email: 0, password: 0, itemsRated: 0, userLevel: 0}, (err, foundUser)=>{
        if(!err){
            if(foundUser){
                console.log('id: ' + req.params.userId + ' details sent back to client');
                response.userData = {
                    registrationNumber: foundUser.registrationNumber, 
                    addresses: foundUser.addresses, 
                    contactNumber: foundUser.contactNumber, 
                    userImage: foundUser.userImage.toString('base64'), 
                    imageType: foundUser.userImageType
                }
            }
            else{
                console.log('No user with id ' + req.params.userId + ' was found');
            }

            res.json(response);
        }
    })
})

// Admin Page
app.get('/allCategories', (req, res)=>{
    Product.find({}, {category: 1}, (err, result)=>{
        if(!err){
            console.log('All Categories sent to Client');
            res.json(result);
        }
    })
})

app.get('/admin/getUserData/:email', (req, res)=> {
    console.log(req.params)

    User.findOne({email: req.params.email}, (err, foundUser)=>{
        if(!err){
            let success = true;

            if(!foundUser){
                success = false;
            }

            res.json({
                userData: foundUser, 
                success: success
            })
            console.log('User Data sent back to client')
        }
    })
})

app.get('/getMenuItem/:menuItem', (req, res)=>{
    console.log(req.params);

    Product.findOne({'items.name': req.params.menuItem}, {'items.$': 1}, (err, foundItem)=>{
        if(!err){
            const response = {
                itemData: null
            }
            if(foundItem){
                // console.log(foundItem)

                const itemDetails = foundItem.items[0];
    
                console.log('Item Details with name: ' + req.params.menuItem);
                response.itemData = {
                    id: itemDetails._id,
                    name: itemDetails.name, 
                    description: itemDetails.description, 
                    currentRating: itemDetails.currentRating, 
                    price: itemDetails.price,
                    itemImage: itemDetails.itemImage.toString('base64'),
                    imageType: itemDetails.imageType
                };
                
                console.log(response.itemData);
                console.log('Item details sent back to client');
            }
            else{
                console.log('Item Details for name: ' + req.params.menuItem + ' Not Found!');
            }

            res.json(response);
        }
    })
})


// POST REQUESTS

// Login & Register Page
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
                
                const defaultUserImage = fs.readFileSync('./assets/images/user image.png');

                // Saving user details to DB
                const newUser = new User({
                    email: req.body.email, 
                    password: hash, 
                    registrationNumber: req.body.registrationNumber,
                    contactNumber: null,
                    address: [], 
                    userImage: defaultUserImage,
                    userImageType: 'image/png', 
                    userLevel: 'student',
                    itemsRated: []
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
    let response = {
        responseMessage: '', 
        success: false, 
        userId: ''
    };

    // Check if account exists
    User.findOne({email: req.body.email}, {password: 1}, async (err, foundUser)=>{
        if(!err){
            if(foundUser){
                // Check for password
                const match = await bcrypt.compare(req.body.password, foundUser.password);

                if(match){
                    response.responseMessage = 'Login Successfull!';
                    response.success = true;
                    response.userId = foundUser._id;
                }
                else{
                    response.responseMessage = 'Password Incorrect';
                }
            }
            else{
                response.responseMessage = 'No Such Account Found';
            }

            res.json(response);
        }
    }) 
})

app.post('/login/admin', (req, res)=>{
    let response = {
        responseMessage: '', 
        success: false, 
        userId: ''
    }
    User.findOne({email: req.body.email}, {password: 1, userLevel: 1},async (err, foundUser)=>{
        if(!err){
            if(foundUser){
                if(foundUser.userLevel === 'admin'){
                    const match = await bcrypt.compare(req.body.password, foundUser.password);

                    if(match){
                        response.responseMessage = 'Login Successfull!';
                        response.success = true;
                        response.userId = foundUser._id;
                    }
                    else{
                        response.responseMessage = "Password Incorrect";
                    }
                }
                else{
                    response.responseMessage = "Account doesn't have Admin Level Privileges";
                }
            }
            else{
                response.responseMessage = 'No Such Account Found';
            }

            res.json(response);
        }
    })
})

// Home Page
app.post('/saveNewContactNumber', (req, res)=>{
    console.log(req.body);

    User.findByIdAndUpdate(req.body.userId, {$set: {contactNumber: req.body.contactNumber}}, (err, foundUser)=>{
        if(!err){
            if(foundUser){
                console.log('Updated contact number for user: ' + req.body.userId);

                res.json({
                    success: 'true', 
                    message: 'New Number Saved'
                })
            }
        }
    })
})

app.post('/addNewAddress', (req, res)=>{
    console.log(req.body);

    User.findByIdAndUpdate(req.body.userId, {$push: {addresses: req.body.newAddress}}, (err, foundUser)=>{
        if(!err){
            if(foundUser){
                console.log('For User ID: ' + req.body.userId, 'New address for saved in DB Successfully');
                res.json({
                    success: true, 
                    message: 'Address Saved in DB'
                })
            }
        }
    })
})

// Admin Page
app.post('/addCategory', (req, res)=>{
    console.log(req.body);

    const response = {
        success: false, 
        message: ''
    }

    // Check if category already exists or not
    Product.findOne({category: req.body.category}, (err, result)=>{
        if(!err){
            if(result === null){
                const newCategory = new Product({
                    category: req.body.category, 
                    items: []
                })
                newCategory.save().then(console.log('Catgory: ' + `'${req.body.category}'` + ' saved to DB'));
                response.message = 'Catgory Successfully added to DB';
                response.success = true;
            }
            else{
                console.log('Category ' + `'${req.body.category}'` + ' already exists in DB');
                response.message = 'Category Already Exits in DB';
            }

            res.json(response);
        }
    })

})

app.post('/addMenuItem', upload.single('imageFile'), (req, res)=>{
    console.log(req.body, req.file);

    const response = {
        success: false, 
        message: ''
    }

    Product.findOne({category: req.body.categoryName}, (err, foundCategory)=>{
        if(!err){
            // Check if Category Exists
            if(foundCategory){
                // Check if Image is less than 16 MB
                if(req.file.size > 16000000){
                    response.message = 'File Size should be less than 16MB';
                }
                else{
                    const newItem = {
                        name: req.body.name, 
                        description: req.body.description, 
                        price: req.body.price, 
                        filterTags: req.body.filterTags.split(','), 
                        itemImage: '',
                        imageType: req.file.mimetype ? req.file.mimetype: 'image/jpg',
                        currentRating: 0, 
                        userRatings: []
                    }
    
                    if(!req.file){
                        const defaultImageFile = fs.readFileSync('./assets/images/Default Food Image.jpg');
                        newItem.itemImage = defaultImageFile;
                    }
                    else{
                        newItem.itemImage = req.file.buffer
                    }
    
                    foundCategory.items.push(newItem);
                    foundCategory.save().then(console.log('New Item: ' + req.body.name + ' was successfully stored in DB'));
    
                    response.message = 'Item Successfully Saved to DB';
                    response.success = true;
                }
            }
            else{
                console.log('Category ' + `'${req.body.categoryName}' not found in DB`)
                response.message = 'Entered Category Not Found';
            }

            res.json(response); 
        }
    })
})

// PUT REQUESTS
// Home Page
app.put('/updateDefaultAddress', (req, res)=>{
    console.log(req.body);

    User.findById(req.body.userId, {addresses: 1},(err, foundUser)=>{
        if(!err){
            foundUser.addresses.forEach(address => {
                if(String(address._id) === req.body.addressId){
                    address.default = true;
                }
                else{
                    address.default = false;
                }
            })

            foundUser.save((err, updated)=>{
                if(!err){
                    const message = 'Updated New Default Address in the DB';
                    console.log(message);
                    res.json({success: true, message: message});
                }
            })
        }
    })
})

app.put('/updateProfilePhoto', upload.single('userProfilePhoto'), (req, res)=>{
    console.log(req.body, req.file);

    User.findByIdAndUpdate(req.body.userId, {$set: {userImage: req.file.buffer, userImageType: req.file.mimetype}}, (err, foundUser)=>{
        if(!err){
            console.log('For User: ' + req.body.userId ,'Updated Profile Photo in DB successfully!');

            res.json({
                success: true, 
                message: 'Updated Profile Photo'
            })
        }
    })
})

// DELETE REQUESTS
// Admin Page
app.delete('/category/:id', (req, res)=>{
    console.log(req.params);

    const response = {
        success: false, 
        message: ''
    }

    Product.findByIdAndDelete(req.params.id, (err, foundCategory)=>{
        if(!err){
            if(foundCategory){
                response.success = true;
                response.message = 'Category Successfully Deleted ';
                console.log('Category with id: ' + req.params.id + ' successfully deleted from DB');
            }
            else{
                response.message = 'Something went wrong';
            }

            res.json(response);
        }
    })
})

app.delete('/deleteUserData/:id', (req, res)=>{
    console.log(req.params);

    const response = {
        success: false, 
        message: ''
    }

    User.findByIdAndDelete(req.params.id, (err, foundUser)=> {
        if(!err){
            if(foundUser){
                response.success = true;
                response.message = 'User Data successfully deleted from DB';
                console.log('User Data for id: ' + req.params.id + ' was successfully deleted from DB');
            }
            else{
                response.message = 'No Account with the entered Email-ID exists';
            }
            
            res.json(response);
        }
    })
})

app.delete('/deleteMenuItem/:id', (req, res)=>{
    User.findByIdAndDelete(req.params.id, (err, foundItem)=>{
        if(!err){
            const response = {
                success: false, 
                message: ''
            }
            if(foundItem){
                response.success = true;
                response.message = 'Menu Item Deleted Successfully';
                console.log('Menu Item with id: ' + req.params.id + ' was successfully deleted from DB');
            }
            else{
                response.message = "Something went wrong!";
                console.log('Menu Item with id: ' + req.params.id + ' not found in DB');
            }

            res.json(response);
        }
    })
})

app.listen(5000, ()=>{
    console.log('The Server is running on port 5000');
})