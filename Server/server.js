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
    address: String, 
    userImage: Buffer, 
    userLevel: String
})
const Product = mongoose.model('Product', {
    category: String, 
    items: [
        {
            name: String, 
            description: String, 
            price: Number, 
            filterTags: [String], 
            itemImage: Buffer
        }
    ]
})

// GET REQUESTS

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

                // Saving user details to DB
                const newUser = new User({
                    email: req.body.email, 
                    password: hash, 
                    contactNumber: null,
                    address: null, 
                    userImage: null, 
                    userLevel: 'student'
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
                                itemImage: ''
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

// DELETE REQUESTS
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
                console.log('User Data for id: ' + req.params.id + ' was successfully deleted from DB')
            }
            else{
                response.message = 'No Account with the entered Email-ID exists';
            }
            
            res.json(response);
        }
    })
})


app.listen(5000, ()=>{
    console.log('The Server is running on port 5000');
})