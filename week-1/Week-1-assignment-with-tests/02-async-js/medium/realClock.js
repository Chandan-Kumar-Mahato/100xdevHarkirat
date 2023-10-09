// //  in this program i am gonna create a clock that will 
// //  give me the time as same in any digital clock
// /* 1:40:23 --> 1 bajera 40 minute and 23 second*/


// // lets go again counter problem

function clock()
{
    var time = new Date();
    var hr = time.getHours();
    var min = time.getMinutes();
    var sec = time.getSeconds();
    console.log(`${hr}:${min}:${sec} `);
}
function showTime()
{
    console.clear();
    clock();
}
setInterval(showTime,1000);
