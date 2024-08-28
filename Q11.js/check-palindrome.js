function isPalindrome(str) {
  let reversedStr = str.split("").reduce((acc, curr) => acc + curr, "");
  return str === reversedStr ? true : false;
}

console.log(isPalindrome("hutoiotuh"));
