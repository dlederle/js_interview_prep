//This is broken because its isn't testing for 'deep' equality
function greetBroken(person) {
  if (person == { name: 'amy' }) {
    return 'hey amy'
  } else {
    return 'hey arnold'
  }
}
//We don't care if its the exact same object, just if the name is amy
function greet(person) {
  if (person.name === 'amy') {
    return 'hey amy'
  } else {
    return 'hey arnold'
  }
}

//This should print out 0, 1, 2, 3
//However, the timeout means it executes with i=4
//The value of i is not captured in the closure
function outOfOrderBroken() {
  for(var i = 0; i < 4; i++) {
    setTimeout(() => console.log(i), 0)
  }
}
//This is fixed with an IIFE to actually get the value in the closure
//https://stackoverflow.com/questions/7213528/why-does-variable-in-settimeout-callback-not-have-expected-value
function outOfOrderFixed() {
  for(var i = 0; i < 4; i++) {
    setTimeout(((val) => {
      return () => console.log(val);
    })(i), 0);
  }
}

//In this case, sayName binds this to the global scope, not the dog object
function brokenDoggo() {
  let dog = {
    name: 'doggo',
    sayName() {
      console.log(this.name)
    }
  }
  let sayName = dog.sayName;
  sayName();
}
//Fixable by explicitly binding 'this' to the dog object
function fixedDoggo() {
  let dog = {
    name: 'doggo',
    sayName() {
      console.log(this.name)
    }
  }
  let sayName = dog.sayName.bind(dog);
  sayName();
}

//This results in a 'fido.bark is not a function' error
//Thats because it is tied to the Dog constructor, not to each instance
function brokenBark() {
  function Dog(name) {
    this.name = name
  }
  Dog.bark = function() {
    console.log(this.name + ' says woof')
  }
  let fido = new Dog('fido');
  fido.bark();
}

//Adding bark as a method to the actual prototype fixes this.
//Either when you declare the constructor or to the prototype
function fixedBark() {
  function Dog(name) {
    this.name = name;
    this.bark = function() {
      console.log(this.name + ' says woof');
    }
  }
  Dog.prototype.bark2 = function() {
    console.log(this.name + ' says arf');
  }
  let fido = new Dog('fido');
  fido.bark();
  fido.bark2();
}

//This weird behavior is due to js type coercion
//the double equals comparison means [2] == 2
//For the expected result, switch to ===
function brokenIsBig() {
  function isBig(thing) {
    if(thing == 0 || thing == 1 || thing == 2) {
      return false
    }
    return true
  }
  console.log(isBig(1)); //false
  console.log(isBig([2])); //false
  console.log(isBig([3])); //true
}
