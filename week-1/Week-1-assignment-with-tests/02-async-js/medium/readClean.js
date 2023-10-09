//  well this program reads data from a file and remove the extra space if present
// const fs = require("fs");

const fs = require("fs");

function cleanIt(data)
{
  return data.replace(/\s+/g," ");
}

// this will write the content of the file in new way
function writeInsideFile(err)
{
  if(err)
  {
    console.log("You have encounter one error");
  }
  else
  {
    console.log("File is updated");
  }
}

// this is being called
function readFromFile(err,data)
{
  if(err)
  {
    console.log("Error Encounters");
  }
  else
  {
    var cleanData = cleanIt(data);
    fs.writeFile("intro.txt",cleanData , "utf-8",writeInsideFile);
  }
}


//  this will read from a file and make any update in the file
fs.readFile("intro.txt","utf-8",readFromFile);


