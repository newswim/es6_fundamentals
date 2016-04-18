var expect = require('expect.js');

describe("REST PARAMETERS", ( ) => {

  it("are like variable arguments.length", ( ) => {

    let doWork = (name, ...numbers) => {
      let result = 0

      // rest params get packaged in a real JS array
      // so we can use Array.prototype methods
      numbers.forEach( (n) => {
        result += n
      })

      return result
    }

    let result = doWork("Dan", 1, 2, 3)
    expect(result).to.be(6)

  })
})

describe("SPREAD OPERATOR", () => {

  it("can spread an array across parameters", ( ) => {

    let doWork = ( x, y, z ) => {
      return x + y + z
    }

    var result = doWork(...[1, 2, 3])

    expect(result).to.be(6)

  })

  it("can build arrays", ( ) => {

    var a = [4, 5, 6]
    var b = [1, 2, 3, ...a, 7, 8, 9]

    expect(b).to.be.an('array');
    expect(b).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]) // had to use to.eql on Array obj

  })
})
