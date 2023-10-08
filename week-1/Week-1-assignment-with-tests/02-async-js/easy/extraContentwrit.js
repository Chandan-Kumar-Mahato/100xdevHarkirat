const fs = require("fs");

const data = "Hello this is new file that ia m glaalkfja is being updated";
function writeToFile(err)
{
  if(err)
  {
    console.log("You encounter error");
    
  }
  else console.log("file is updated");
  
}
fs.writeFile('intro.txt', data , 'utf-8',writeToFile);