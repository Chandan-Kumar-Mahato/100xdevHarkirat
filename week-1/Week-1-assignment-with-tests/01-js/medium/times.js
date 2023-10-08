/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
*/

// this program is telling me to calculatet the time taken in second to sum to number from 1 to n in sec
function calculateTime(n) {
    const date = new Date().getTime();
    var sum = 0;
    for(let i = 1;i<=n;i++)
    {
        sum +=i;
    }
    const calcDate = new Date().getTime();
    return calcDate-date;
    
}
console.log(calculateTime(10000000000));
