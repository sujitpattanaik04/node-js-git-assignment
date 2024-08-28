// 1. Type Coercion Oddities
console.log([] + []); // ""
console.log([] + {}); // "[object Object]"
console.log({} + []); // 0
console.log(2 + "2"); // "22" (number + string)
console.log(2 - "2"); // 0 (number - string)
console.log("2" - 1); // 1 (string - number)
console.log(null + 1); // 1 (null is treated as 0)
console.log(undefined + 1); // NaN

// 2. NaN is Not Equal to NaN
console.log(NaN === NaN); // false
console.log(NaN == NaN); // false
console.log(Object.is(NaN, NaN)); // true (ES6+)

// 3. Unexpected Behavior of typeof
console.log(typeof null); // "object" (a known bug)
console.log(typeof function () {}); // "function" (though functions are technically objects)
console.log(typeof []); // "object" (arrays are objects)
console.log(typeof NaN); // "number" (even though it's Not-a-Number)

// 4. Automatic Semicolon Insertion
function test() {
  return;
  {
    name: "Sujit";
  }
}

console.log(test()); // undefined, because a semicolon is automatically inserted after `return`

// 5.Equality Comparisons
console.log(false == "0"); // true
console.log(null == undefined); // true
console.log([] == ![]); // true
console.log(0 == []); // true
console.log(0 == ""); // true

// 6. Floating Point Precision Issues
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false

// 7. Functions Hoisting
hoistedFunction(); // "This function is hoisted"

function hoistedFunction() {
  console.log("This function is hoisted");
}

console.log(hoistedVar); // undefined
var hoistedVar = "This variable is partially hoisted";

// 8. Global Object Leakage(in non-strict mode)
function test() {
  undeclaredVar = "This is global";
}
test();
console.log(undeclaredVar); // "This is global"

// 9. The this Keyword
const obj = {
  method: function () {
    console.log(this); // refers to obj
  },
};
obj.method(); // logs obj

const func = obj.method;
func(); // logs global object (or undefined in strict mode)
