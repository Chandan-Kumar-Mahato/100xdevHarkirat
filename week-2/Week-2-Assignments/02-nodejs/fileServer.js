/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module

  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files

  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt

    - For any other route not defined in the server return 404

    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
app.get('/filesdata',(req,res)=>{
  const fileName =path.join(__dirname ,'./files/',req.query.file);
  console.log(fileName);
  fs.readFile(fileName,"utf-8",(err,data)=>{
    if(err)
    {
      res.send(`Error found`);
    }
    else
    {
      res.send(data);
    }
  })
  // res.send(`hello this will have file data`);
})
app.get('/files', (req,res)=>{
  const filePath = path.join(__dirname,'./files/')
  //  this returns the present files  in the form of array
  fs.readdir(filePath,(err,filesColl)=>{
    if(err)
    {
      console.log(err);
    }
    else
    {
      // var ans = filesColl.filter((filesColl)=>{
      //   return filesColl;
      // })
      res.json(filesColl);
    }
  });
})

// this will simply show me the message that port is listening
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;
