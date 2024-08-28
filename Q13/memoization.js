function memoize(fn) {
  const cache = {}; // Object to store cached results

  return function (key) {
    if (cache[key]) {
      console.log("Fetching from cache:", key);
      return cache[key]; // Return cached result
    }

    console.log("Calculating result:", key);
    const result = fn(key);
    cache[key] = result; // Store the result in the cache
    return result;
  };
}

function slowFunction(num) {
  let sum = 0;
  for (let i = 0; i <= num; i++) {
    sum += i;
  }
  return sum;
}

const calculateSum = memoize(slowFunction);

console.time();
console.log(calculateSum(10090780)); // Calculating result
console.timeEnd();

console.time();
console.log(calculateSum(10090780)); // Fetching from cache
console.timeEnd();
