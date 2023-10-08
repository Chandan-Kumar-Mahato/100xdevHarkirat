console.log("hi mom");

// here you simply have to think about the use case of setInterval

var counter = 1;
function counterIncrease()
{
    console.clear();
    console.log(counter);
    counter++;
}
setInterval(counterIncrease,1000);