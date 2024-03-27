const express = require('express');
const bodyParser = require('body-parser');
const router = require('./Routes/AdminRoutes');
const app = express();

let USERS = [];
let COURSES = [];
let ADMINS = ["apple"];
app.use(bodyParser.json());


app.use('/admin',router);




app.listen(3001 , ()=>{
    console.log(`server started at port 3000`)
})

