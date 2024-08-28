function isAnagrams(str1, str2) {
  let alphabets = "abcdefghijklmnopqrstuvwxyz";
  let arr = new Array(26).fill(0);
  if (str1.length !== str2.length) {
    return false;
  }
  for (let el of str1) {
    arr[alphabets.indexOf(el)]++;
  }
  for (let el of str2) {
    arr[alphabets.indexOf(el)]--;
  }
  for (let el of arr) {
    if (!el) return false;
  }
  return true;
}

console.log(isAnagrams("success", "succeec"));
