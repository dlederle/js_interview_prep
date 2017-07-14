const assert = require('assert');

//https://en.wikipedia.org/wiki/Primality_test#Pseudocode
//"For not very large numbers"
function isPrime(num) {
  if(num <= 1) {
    return false;
  } else if (num <= 3) {
    return true;
  } else if (num % 2 == 0 || num % 3 === 0) {
    return false;
  }
  let i = 5;
  while(i * i <= num) {
    if(num % i === 0 || num % (i + 2) === 0) {
      return false;
    }
    i = i + 6;
  }
  return true;
}
function testPrime() {
  assert.equal(isPrime(0), false);
  assert.equal(isPrime(1), false);
  assert.equal(isPrime(17), true);
  assert.equal(isPrime(1000000000000000), false);
}

function factorial(num) {
  if(num <= 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}
function testFactorial() {
  assert.equal(factorial(0), 1);
  assert.equal(factorial(1), 1);
  assert.equal(factorial(6), 720);
  assert.equal(factorial(10), 3628800);
}

//Return's nth Fibonacci number
function fib(num) {
  if(num === 0) {
    return 0;
  }
  if(num <= 2) {
    return 1;
  } else {
    return fib(num - 1) + fib(num - 2);
  }
}
function testFib() {
  assert.equal(fib(0), 0);
  assert.equal(fib(1), 1);
  assert.equal(fib(10), 55);
  assert.equal(fib(20), 6765);
}

function isSorted(arr) {
  let last = Number.NEGATIVE_INFINITY;
  for (num of arr) {
    if(num < last) {
      return false;
    }
    last = num;
  }
  return true;
}
function testSorted() {
  assert.equal(isSorted([]), true);
  assert.equal(isSorted([-Infinity, -5, 0, 3, 9]), true);
  assert.equal(isSorted([3, 9, -3, 10]), false);
}

function filter(arr, test) {
  const retArr = [];
  for (el of arr) {
    //This should maybe use apply, to support the standard params.
    if(test(el)) {
      retArr.push(el);
    }
  }
  return retArr;
}
function testFilter() {
  assert.deepEqual(filter([1, 2, 3, 4], n => n < 3), [1, 2]);
  assert.deepEqual(filter([0, 1, 2, 3, 4, 5], isPrime), [2, 3, 5]);
}

function reduce(arr, func, val) {
  if(arr.length < 2) {
    return func(arr[0], val);
  }
  return func(reduce(arr.slice(1), func, arr.shift()), val);
}
function testReduce() {
  assert.equal(reduce([1, 2, 3, 4], (a, b) => a + b, 0), 10);
}

function reverse(str) {
  if(str.length < 2) {
    return str;
  }
  const last = str.slice(str.length - 1, str.length);
  const rest = str.slice(0, str.length - 1);
  return last + reverse(rest);
}
function testReverse() {
  assert.equal(reverse(''), '');
  assert.equal(reverse('abcdef'), 'fedcba');
}

function indexOf(arr, val) {
  for(let i = 0; i < arr.length; i++) {
    //Not deep equals
    if(val === arr[i]) {
      return i;
    }
  }
  return -1;
}
function testIndexOf() {
  assert.equal(indexOf([1, 2, 3], 1), 0);
  assert.equal(indexOf([1, 2, 3], 4), -1);
}

function isPalindrome(str) {
  if(str.length <= 1) {
    return true;
  }
  str = str.toLowerCase().replace(/\s/g, '');
  const first = str[0];
  const last = str[str.length - 1];
  if(first != last) {
    return false;
  }
  const rest = str.slice(1, str.length - 1);
  return isPalindrome(rest);
}
function testPalindrome() {
  assert.equal(isPalindrome(''), true);
  assert.equal(isPalindrome('abcdcba'), true);
  assert.equal(isPalindrome('abcd'), false);
  assert.equal(isPalindrome('A man a plan a canal Panama'), true);
}

/*
 * WIP
function missing(arr) {
  let retVal = undefined;
  let largest = Number.NEGATIVE_INFINITY;
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] > largest) {
      largest = arr[i];
    }
  }
  return retVal;
}
console.log(missing([0, 1, 2, 3]));
function testMissing() {
}
//testMissing();
*/
