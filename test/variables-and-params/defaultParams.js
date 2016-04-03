var expect = require('expect.js');

describe("DEFAULT PARAMETERS", function () {

  it("provides default", function () {

    var doWork = function(name="Dan") {
      return name
    }

    // the expression defined in the function's parameters
    // will only receive default assignment when evoked w/o args
    // or when explicitly passed 'undefined'
    var result = doWork()

    expect(result).to.be("Dan")

  })

  it("will provide a value for undefined", function () {

    let doWork = function ( a = 1, b = 2, c = 3 ) {
      return [ a, b, c ]
    }

    let [a,b,c] = doWork(5, undefined)

    expect(a).to.be(5)
    expect(b).to.be(2)
    expect(c).to.be(3)

  })

  it("works with destructuring", function () {

    let doWork = ( url, { data = "Dan", cache = true }) => {
      return data
    }

    let result = doWork("api/test", { cache: false })

    expect(result).to.be("Dan")
    
  })

})
