import expect from 'expect.js'

/* * * * * * * * * * * * * *

SOME RULES ABOUT ITERATORS

They do remove some features that we may expect --
1. There is no .length property
2. Can only use to go one item at a time, until reaching the end


FUNCTIN SIGNATURE

function makeIterator(array){
    var nextIndex = 0;

    return {
       next: function(){
           return nextIndex < array.length ?
               {value: array[nextIndex++], done: false} :
               {done: true};
       }
    }
}

* * * * * * * * * * * * * */

describe("ITERABLES", function() {

  it("can work with iterators at a low level", function() {

    let sum = 0;
    let numbers = [1, 2, 3, 4];

    // for loop
    for (
      let i = 0;
      i < numbers.length;
      i++ ){
      sum += numbers[i]
    }

    expect(sum).to.eql(10)

    // for in
    sum = 0
    for (let i in numbers) {
      sum += numbers[i]
    }

    expect(sum).to.eql(10)

    // iterator
   sum = 0

    // having to use Symbol.iterator even though
    // instructions were to use .values() here . . API perhaps changed?
    let iterator = numbers[Symbol.iterator]();
    let next = iterator.next();

    while(!next.done){
      sum += next.value;
      next = iterator.next();
    }

  })

})

describe("for of", function() {
  /* FOR OF */

  // Loops only over _values_
  // whereas for/in will loop over _keys_ and _values_

  it("can work with iterables at a high level", () => {

    let sum = 0
    let numbers = [1, 2, 3, 4]

    for (let n of numbers){
      sum += n
    }

    expect(sum).to.eql(10)
  })
})

describe("iterabale", function () {
  it("can be built by implementing Symbol.iterator", function () {

    class Company {
      constructor() {
        this.employees = []
      }

      addEmployees(...names) {
        this.employees = this.employees.concat(names)
      }

      [Symbol.iterator]() {
        return new ArrayIterator(this.employees)
      }
    }

    class ArrayIterator {
      constructor(array) {
        this.array = array
        this.index = 0
      }

      next() {
        var result = { value: undefined, done: true}
        if (this.index < this.array.length) {
          result.value = this.array[this.index];
          result.done = false;
          this.index += 1;
        }
        return result;
      }

    }

    let count = 0
    let company = new Company()
    company.addEmployees("Tim", "Sue", "Joy", "Tom")

    for(let employee of company) {
      count += 1
    }

    expect(count).to.eql(4)

  })
})
