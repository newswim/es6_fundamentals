import expect from 'expect.js'

describe("CLASSES", () => {

  it("can have a super class", () => {

    class Person {
      constructor(name) {
        this.name = name
      }

      get name () {
        return this._name
      }

      set name (newValue) {
        if (newValue) this._name = newValue
      }
    }

    // Person is said to be the Super Class of Employee

    class Employee extends Person {
      doWork() {
        return `${this._name} is working`
      }
    }

    let p1 = new Person("Dan")
    let e1 = new Employee("Tommy")

    expect(p1.name).to.be("Dan")
    expect(e1.name).to.be("Tommy")
    expect(e1.doWork()).to.be("Tommy is working")

  })

  /* * * * * * * * * *

// Using super(), we can pass a value to a
// Super Class' constructor to be returned within
// our extended class.

   * * * * * * * * * */

  it("can pass a parameter to the super class", () => {

    class Person {
      constructor(name) {
        this.name = name
      }

      get name () {
        return this._name
      }

      set name (newValue) {
        if (newValue) this._name = newValue
      }
    }

    class Employee extends Person {
      constructor(title, name) {
        super(name)
        this.title = title
      }

      doWork() {
        return `${this._name} is working`
      }
    }

    let e1 = new Employee("Developer", "Dan")
    expect(e1.name).to.be("Dan")
    expect(e1.title).to.be("Developer")

  })

  it("can override methods", () => {

    // a new class extends Object by default, so we're
    // just stating that explicitly in this example
    // Update: actually, the behavior is a little different

    class Person {
      constructor(name) {
        this.name = name
      }

      get name () {
        return this._name
      }

      set name (newValue) {
        if (newValue) this._name = newValue
      }

      // overriding native .toString() method
      toString() {
        return this.name;
      }

      doWork() {
        return 'free'
      }
    }

    class Employee extends Person {
      constructor(name) {
        super(name)
      }

      // overriding super's doWork method
      doWork() {
        return 'paid'
      }
    }

    let p1 = new Person("Dan")
    let e1 = new Employee("Tommy")

    expect(p1.toString()).to.be("Dan")
    expect(e1.toString()).to.be("Tommy")
    expect(p1.doWork()).to.be("free")
    expect(e1.doWork()).to.be("paid")

    let makeEveryoneWork = (...people) => {
      var result = []
      for (var i = 0; i < people.length; i++) {
        if (people[i] instanceof Person) {
          result.push(people[i].doWork())
        }
      }
      return result;
    }

    expect(makeEveryoneWork(p1, e1, {})).to.eql(["free", "paid"])

  })

})
