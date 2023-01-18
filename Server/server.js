const   express = require('express'), 
        app = express(), 
        bodyParser = require('body-parser');

app.get('/api', (req, res)=>{
    const message = 'Hey! Server running here sucessfully!';
    console.log(message);
    res.send(message);
})

app.listen(5000, ()=>{
    console.log('The Server is running on port 5000');
})