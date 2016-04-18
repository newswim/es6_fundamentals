// const expect = require('chai').expect
var expect = require('expect.js');

describe("DESTRUCTURING", function () {
  "use strict"

  it("can destructure arrays", function () {

    let x = 2;
    let y = 3;

    [x, y] = [y, x]
    /* ^ not an array - but value assignment
    */

    expect(x).to.be(3)
    expect(y).to.be(2)

  })


/* - - - - - - - - - - -

Literally, this is saying
" Take the first value of the array
and assign it to 'x' and the second
value, assign it to 'y' "

- - - - - - - - - - - - */


// SKIPPING VALUES


  it("can still destructure arrays", function () {

    var doWork = function() {
      return [1, 2, 3]
    }

    let [, x, y] = doWork()

    expect(x).to.be(2)
    expect(y).to.be(3)

    /* * * * * * * * * * * * *
    this passes because the comma
    allows the first item to be skipped
    */

    // Leftover assignments are 'undefined'

    // var doWork = function() {
    //   return [3, 2, 1]
    // }
    //
    // let [, b, c, d] = doWork()
    //
    // expect(b).to.be(2)
    // expect(c).to.be(1)
    // expect(d).toBeUndefined

  })

  // DESTRUCTURING OBJECTS

  it("can destructure objects", function () {

    let doWork = function () {
      return {
        firstName: "Scott",
        lastName: "Allen",
        twitter: "OdeToCode"
      }
    }

    let { firstName: first,
          twitter: twitter } = doWork()

    expect(first).to.be("Scott")

  })

  // DESTRUCTURED PARAMETERS

  it("works with parameters", function () {

    let doWork = function (url, {data, cache}) {
      return data
    }

    let result = doWork(
                  "api/test", {
                    data: "test",
                    cache: false
                  }
                )

    expect(result).to.be("test")

  })

})
