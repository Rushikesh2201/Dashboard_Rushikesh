const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('./middleware/logger');
require('./models')

//***init middleware***//
app.use(logger);

app.use(express.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.json());

app.get('/' , (req,res) =>{
    res.send('Welcome To Dashboard App...')
    })

//***API routes***//
app.use('/api/users', require('./controllers/routes/api/user_info'));


const port = 8080;
app.listen(port)

module.exports = app;