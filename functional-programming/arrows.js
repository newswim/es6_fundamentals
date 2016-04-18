import expect from 'expect.js'

describe("ARROW FUNCTIONS", () => {
  it("provides a compact syntax to define a function",() => {

    let add = (x,y) => x + y
    let square = x => x * x
    let three = () => 3

    expect(add(2, three() )).to.be(5)
  })

  it("can be used with array methods", () => {

    const numbers = [1, 2, 3, 4]

    let sum = 0

    // forEach
    numbers.forEach(n => sum += n)
    expect(sum).to.be(10)

    // MAP
    let doubled = numbers.map(n => n * 2)
    expect(doubled).to.eql([2, 4, 6, 8])

  })

  it("lexically binds to 'this'", function (done) {

    this.name = "Dan"

    setTimeout(() => {
      expect(this.name).to.be("Dan")
      done()
    }, 25)

  })

})
