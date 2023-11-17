const fs = require('fs');
const path = require('path');

const directoryPath =path.join(__dirname,'./files/') ; // Replace with the path to your directory
fs.readdir(directoryPath,'utf-8',(err,data)=>{
  if(err)
  {
    console.log(err);
  }
  else
  {
    console.log(data);
  }
})