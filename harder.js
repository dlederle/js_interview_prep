const assert = require('assert');

function permute(str) {
  return [str];
}

function testPermute() {
  assert.deepEqual(permute(''), []);
  assert.deepEqual(permute('abc'), ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']);
}

//https://css-tricks.com/debouncing-throttling-explained-examples/
//http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
function debounce(func, wait, options) {
  options = options || {};
  options.leading = options.leading || false;
  options.trailing = options.trailing || true; //TODO
  options.maxWait = options.maxWait || 1000; //IDK what a smart default is
  if(wait != undefined) {
    wait = wait < maxWait ? wait : maxWait;
  } else {
    wait = 0;
  }
  let timeout;
  return function debounced() {
    const obj = this;
    //When this is an anon function, 'arguments' points to debounce
    const args = arguments;
    function delayed() {
      if(!options.leading)
        func.apply(obj, args);
      timeout = null;
    }
    if(timeout) {
      clearTimeout(timeout);
    } else if (options.leading) {
        func.apply(obj, args);
    }
    timeout = setTimeout(delayed, wait);
  };
}

class Node {
  constructor() {
    this.value = arguments[0];
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.root = null;
    for(let i=0; i<arguments.length; i++) {
      this.add(arguments[i]);
    }
  }

  add(el) {
    if(!this.root) {
      this.root = new Node(el);
    } else {
      const tmp = new Node(el);
      tmp.next = this.root;
      this.root = tmp;
    }
  }

  has(el) {
    let tmp = this.root;
    while(tmp != null) {
      if(tmp.value === el) {
        return true;
      } else {
        tmp = tmp.next;
      }
    }
    return false;
  }
}

let list = new LinkedList(1, 2, 3);
