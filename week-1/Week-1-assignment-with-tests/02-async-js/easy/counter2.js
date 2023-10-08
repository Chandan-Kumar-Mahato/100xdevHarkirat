//  this time you have to perform the same program but without using the counter

let counter = 1;
function counterIncrease()
{
    console.log("you are in counter");
    console.clear();
    console.log(counter);
    counter++;
}

   for(var  i = 1;i<4;i++)
    setTimeout(counterIncrease,i*1000);

