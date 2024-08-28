function countVowels(str) {
  let count = 0;

  for (let el of str) {
    if ("aeiou".includes(el)) count++;
  }

  return count;
}

console.log(countVowels("successghseuoiaaeds"));
