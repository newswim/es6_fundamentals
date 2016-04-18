/*

COMPREHENSIONS

- a terse syntax for building arrays and generators

ARRAY COMPREHENSION
- an expression written inside square brackets
- can use any iterable object
- using for/of statement, `let` is not required, it is implied

```js

var numbers = [for (n of [1, 2, 3]) n * n]

expect(numbers).to.eql([1, 4, 9])

```

CAN ALSO USE A PREDICATE TO FILTER VALUES

```js

var numbers = [for (n of [1, 2, 3]) if(n > 1) n * n]

expect(numbers).to.eql([4, 9])

```

THE GENERATOR COMPREHENSION

- builds a generator, rather than an array
- gives values that we can evaluate lazily
- use yield

```js

var numbers = (for (n of [1, 2, 3]) n * n)

expect(Array.from(numbers)).to.eql([1, 4, 9])
```

*/

/* dependencies */
import expect from 'expect.js'


describe("COMPREHENSIONS", function () {

  it("can be used with yield", function () {

    class Company {
      constructor() {
        this.employees = []
      }

      addEmployees(...names) {
        this.employees = this.employees.concat(names)
      }

      *[Symbol.iterator]() {
        for (let e of this.employees) {
          console.log("yield", e)
          yield e
        }
      }
    }

    /* Re-writing `filter` with a comprehension */

    let filter = function* (items, predicate) {
      yield [for (item of items) item]

      // for(let item of items) {
      //   console.log("filter", item)
      //   if(predicate(item)) {
      //     yield item;
      //   }
      // }
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
    let found
    company.addEmployees("Tim", "Sue", "Joy", "Tom")

    for(let employee of take(filter(company, e => e[0] == 'S'), 1)) {
      count += 1
      found = employee
      console.log("got", employee)
    }

    expect(count).to.eql(1)
    expect(found).to.be("Sue")

  })



})
