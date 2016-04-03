import expect from 'expect.js'

describe("TEMPLATE LITERALS", ( ) => {

  it("can easily combine literals and data", ( ) => {
    let doWork = (name) => {
      return `Hello, ${name}`
    }

    let result = doWork("Dan")

    expect(result).to.be("Hello, Dan")

  })

  it("can help build URLs", () => {

    let category = "music"
    let id       = 2112

    let url = `http://apiserver/${category}/${id}`

    expect(url).to.be("http://apiserver/music/2112")

  })

  it("can use tags", () => {

/* * * * * * * * * *

@param strings Array | "parsed template string"
  - the pieces of literal text, chopped into an array such that the
    substitutions are removed

@param ...values Array | rest parameter
  - contains the values being used inside the template

@function upper
  - recreate the output of a template string by concatinating the values
  - additionally, convert any text to upper case

@footprint

strings = ["", " + ", " is ", ""]
values  = [1, 3, 4]

*/

    let upper = (strings, ...values) => {
      let result = ""

      for (var i = 0; i < strings.length; i++) {
        result += strings[i]
        if (i < values.length) {
          result += values[i]
        }
      }
      return result.toUpperCase()
    }

    let x = 1
    let y = 3
    let result = upper `${x} + ${y} is ${x+y}` // calling 'upper' on template string
                                       // ^ expressions are valid

    expect(result).to.be("1 + 3 IS 4")

  })
})
