function isAnagrams(str1, str2) {
  let asciiOfa = "a".charCodeAt(0);
  let arr = new Array(26).fill(0);

  if (str1.length !== str2.length) {
    return false;
  }
  for (let el = 0; el < str2.length; el++) {
    arr[str2.charCodeAt(el) - asciiOfa]++;
  }
  for (let el = 0; el < str1.length; el++) {
    arr[str1.charCodeAt(el) - asciiOfa]--;
  }
  for (let el of arr) {
    if (el) return false;
  }
  return true;
}

console.log(isAnagrams("eraa", "aree"));
