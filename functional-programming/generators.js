// NOTE: For 'can build iterable' to pass, i had to add `--require babel-polyfill`
// to the test script

import expect from 'expect.js'


/* * * * * * * * *

"A generator is like a factory function for iterators"

* * * * * * * * */

describe("GENERATORS", function() {

  it("can build an iterable", function() {

    let numbers = function* (start, end) {
      for(let i = start; i <= end; i++) {
        console.log(i)
        yield i
      }
    }

    let sum = 0
    let iterator = numbers(1,4)

    let next = iterator.next()
    while(!next.done) {
      sum += next.value
      console.log("next")
      next = iterator.next()
    }

    expect(sum).to.be(10)

  })

  it("can use 'for / of' for better syntax", () => {

    let numbers = function* (start, end) {
      for(let i = start; i <= end; i++) {
        console.log(i)
        yield i
      }
    }

    let sum = 0

    for(let n of numbers(1, 5)) {
      sum += n
      console.log("next")
    }

    expect(sum).to.be(15)

  })


  it("can replace [Symbol.iterator]()", function () {

    class Company {
      constructor() {
        this.employees = []
      }

      addEmployees(...names) {
        this.employees = this.employees.concat(names)
      }

      *[Symbol.iterator]() {
        for (let e of this.employees) {
          console.log(e)
          yield e
        }
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

  it("can evoke a filter function", function () {

    class Company {
      constructor() {
        this.employees = []
      }

      addEmployees(...names) {
        this.employees = this.employees.concat(names)
      }

      *[Symbol.iterator]() {
        for (let e of this.employees) {
          console.log(e)
          yield e
        }
      }
    }

    let filter = function* (items, predicate) {
      for(let item of items) {
        console.log("filter", item)
        if(predicate(item)) {
          yield item;
        }
      }
    }

    let take = function*(items, number) {
      let count = 0
      if(number < 1) return;
      for(let item of items) {
        console.log("take", item)
        yield item;
        count += 1;
        if(count >= number) {
          return;
        }
      }
    }

    let count = 0
    let company = new Company()
    company.addEmployees("Tim", "Sue", "Joy", "Tom")

    for(let employee of take(filter(company, e => e[0] == 'T'), 1)) {
      count += 1
    }

    expect(count).to.eql(1)

  })


  it("can take a parameter from next(param)", function () {

    let range = function*(start, end) {
      let current = start
      while (current <= end) {
        let delta = yield current
        current += delta || 1
      }
    }

    // this is not a generator but DOES return an `next` method

    let range2 = function(start, end) {
      let current = start
      let first = true
      return {
        next (delta = 1) {
          let result = {
            value: undefined,
            done: true }
          if(!first) {
            current += delta
          }
          if (current <= end) {
            result.value = current
            result.done = false
            current += delta
          }
          first = false
          return result
        }
      }
    }

    let result = []
    let iterator = range2(1, 10)
    let next = iterator.next()

    while(!next.done) {
      result.push(next.value)
      next = iterator.next()
    }

    expect(result).to.eql([1, 3, 5, 7, 9])

  })


})
