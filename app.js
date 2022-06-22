
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cron = require('node-cron');


app.use(express.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.json());


 const response = app.get('/', async(req,res) => {
    try{
         
         const Schedule = cron.schedule(' * * */11 * * */0-6',() =>{
            res.send("Hello Work... " + new Date())
            console.log("Hello work " +  new Date()) 
       })
      
       //message.stop();        
    } 
    catch(err){
        console.log(err);
    }
 });     


const port = 5000;
app.listen(port);
console.log(`App Listen on Port ${port}`);

module.export = app;