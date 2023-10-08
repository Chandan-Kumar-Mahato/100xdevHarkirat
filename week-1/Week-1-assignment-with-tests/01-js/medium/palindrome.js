/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.

  Once you've implemented the logic, test your code by running
  - `npm run test-palindrome`
*/

function isPalindrome(str) {
  str = str.toLowerCase();
  str = str.replace(/[^a-zA-Z0-9]/g, '');
  var check;
  check = str.split('').reverse().join('');
  console.log(check);
  if(check==str)
  return true;
  else return false;
}
console.log(isPalindrome("open5ai"));

module.exports = isPalindrome;
