//  well this program reads data from a file and remove the extra space if present
// const fs = require("fs");

// const data = "hello this is new data and i love Nepal."
// function read(err,data)
// {
//     if(err)
//     {
//         console.log("Error encounters");
//     }
//     else 
//     {
        
//         console.log(data);
//     }
// }
// fs.readFile("intro.txt","utf-8",read);

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