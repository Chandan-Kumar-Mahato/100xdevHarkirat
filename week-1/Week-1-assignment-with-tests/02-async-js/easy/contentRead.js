const fs = require("fs");

function fileRead(err,data)
{
  if(err)
  {
    console.log("You encounter error");
    
  }
  else console.log(data);
  
}
fs.readFile('intro.txt','utf-8',fileRead);