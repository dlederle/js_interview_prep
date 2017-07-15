const assert = require('assert');

//memoized fibonacci
function fib2(num) {
  const memo = {};
  function f(n) {
    let val;
    if(n in memo) {
      val = memo[n];
    } else {
      if(n === 0) {
        val = 0;
      } else if(n <= 2) {
        val = 1;
      } else {
        val = f(n - 1) + f(n - 2);
      }
      memo[n] = val;
    }
    return val;
  }
  return f(num);
}
function testFib2() {
  assert.equal(fib2(0), 0);
  assert.equal(fib2(1), 1);
  assert.equal(fib2(10), 55);
  assert.equal(fib2(50), 12586269025);
}

function isBalanced2(str) {
  const stack = [];
  for(ltr of str) {
    if(ltr == '{' || ltr == '[' || ltr == '(') {
      stack.push(ltr);
    }
    if(ltr == '}' || ltr == ']' || ltr == ')') {
      let compare = stack.pop();
      if(compare == undefined) { console.log('popping'); return false; }
      let distance = ltr.charCodeAt(0) - compare.charCodeAt(0) ;
      if(distance < 0 || distance > 3) { return false; }
    }
  }
  return stack.length == 0;
}
function testIsBalanced2() {
  assert.equal(isBalanced2('(foo { bar (baz) [boo] })'), true);
  assert.equal(isBalanced2('foo { bar { baz }'), false);
  assert.equal(isBalanced2('foo { (bar [baz] } )'), false);
}

function uniq(arr) {
  const exist = {};
  return arr.filter((el) => {
    //if the element isn't already tracked, add it
    if(!exist[el]) {
      exist[el] = true;
      return true;
    } else {
      return false;
    }
  });
}
function testUniq() {
  assert.deepEqual(uniq([]), []);
  assert.deepEqual(uniq([1, 4, 2, 2, 3, 4, 8]), [1, 4, 2, 3, 8]);
}

function intersection(first, second) {
  const retArr = [];
  const exist = {};
  for(el of first) {
    exist[el] = true;
  }
  for(el of second) {
    if(exist[el] == true) { retArr.push(el); }
  }
  return retArr;
}
function testIntersection() {
  assert.deepEqual(intersection([1, 5, 4, 2], [8, 91, 4, 1, 3]), [4, 1]);
  assert.deepEqual(intersection([1, 5, 4, 2], [7, 12]), []);
}

//Merge sort
//https://en.wikipedia.org/wiki/Merge_sort
function sort(arr) {
  let merge = (l, r) => {
    const ret = [];
    while(l.length > 0 && r.length > 0) {
      let lFirst = l[0];
      let rFirst = r[0];
      lFirst < rFirst ? ret.push(l.shift()) : ret.push(r.shift());
    }
    while(l.length > 0) { ret.push(l.shift()); }
    while(r.length > 0) { ret.push(r.shift()); }
    return ret;
  }

  let merge_sort = (list) => {
    if(list.length <= 1) { return list; }
    const left = list.slice(0, list.length / 2);
    const right = list.slice(list.length / 2, list.length);
    return merge(merge_sort(left), merge_sort(right));
  }
  return merge_sort(arr);
}
function testSort() {
  assert.deepEqual(sort([]), []);
  assert.deepEqual(sort([-4, 1, Infinity, 3, 3, 0]), [-4, 0, 1, 3, 3, Infinity]);
}

function includes(arr, el) {
  if(arr.length < 2) {
    return arr[0] === el ? true : false;
  }
  return includes(arr.slice(0, arr.length / 2), el) ||
         includes(arr.slice(arr.length / 2, arr.length), el);
}
function testIncludes() {
  assert.equal(includes([1, 3, 8, 10], 8), true);
  assert.equal(includes([1, 3, 8, 8, 15], 15), true);
  assert.equal(includes([1, 3, 8, 10, 15], 9), false);
}

function assignDeep(target, source) {
  for(key in source) {
    //We found an object
    if(typeof source[key] === 'object') {
      //Is this key already an object?
      if(typeof(target[key]) !== 'object') { target[key] = {}; }

      assignDeep(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}
function testAssignDeep() {
  assert.deepEqual(assignDeep({a: 1}, {}), {a: 1});
  assert.deepEqual(assignDeep({a: 1}, {a: 2}), {a: 2});
  assert.deepEqual(assignDeep({a: 1}, {a: {b: 2} }), {a: {b: 2} });
  assert.deepEqual(assignDeep({a: {b: {c: 1 }}}, {a: {b: {d: 2}}, e:3 }), {a: {b: { c: 1, d: 2}}, e:3 });
}
testAssignDeep();
