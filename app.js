
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cron = require('node-cron');

app.use(express.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.json());


 const response = app.get('/', async(req,res) => {
    try{
         const message = cron.schedule('*/5 * * * * *',() =>{
        res.send("Hello Work..." + new Date())
        console.log("Hello work" +  new Date())  
       })         
    } 
    catch(err){
        console.log(err);
    }
});

// const response = app.get('/', (req,res) =>{
//     try{
//     res.send("Hello Work...");
//     }
//     catch(err){
//         console.log(err);
//     }
// })

//                             // s   m h d m w
// const message = cron.schedule('*/5 * * * * *',()=>
// //cron.schedule('00 00 11 * * 0-6', () =>)
// {
//     try{
//         console.log( "Hello Work " +  new Date())
//     }
//     catch(err){
//         console.log(err);
//         }
//        }) 
        //message.stop();
       //message.start();     


const port = 5000;
app.listen(port);
console.log(`App Listen on Port ${port}`);

module.export = app;