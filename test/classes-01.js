import expect from 'expect.js'

/*

  Instantiating
  Objects are instances of a Class
  Objects may contain their own data, but the methods are shared from the Class
    across all instances
  Under the hood, it's using Prototypal Inheritence, and requires 'new'

*/

describe("the class keyword", () => {

  it("can create a class", () => {

    class Employee {
      doWork() {
        return "complete!"
      }

      getName() {
        return "Dan"
      }
    }

    let e = new Employee()

    expect(e.doWork()).to.be("complete!")
    expect(e.getName()).to.be("Dan")
  })

  it("can have a constructor", () => {

    class Employee {

      constructor (name) {
        this._name = name
      }
      doWork() {
        return "complete!"
      }

      getName() {
        return this._name
      }
    }

    let e1 = new Employee("Steve")
    let e2 = new Employee("Tom")

    expect(e1.getName()).to.be("Steve")
    expect(e2.getName()).to.be("Tom")
  })

// ECAPSULATION with GETTERS and SETTERS

  it("has a getters and setters", ( ) => {

    class Employee {

      constructor (name) {
        this._name = name
      }

      doWork() {
        return "complete!"
      }

      get name() {
        return this._name.toUpperCase()
      }

      set name(newValue) {
        this._name = newValue
      }
    }

    let e1 = new Employee("Steve")
    let e2 = new Employee("Tom")

    expect(e1.name).to.be("STEVE")
    expect(e2.name).to.be("TOM")
  })

/**********NOTES*********

Getters and Setters

- Be careful not to create a getter which calls itself
- Actually a part of the ECMAScript 5.1 spec, but were only avail in IE >= 9

Syntax :

{set prop(val) { . . . }}
{set [expression](val) { . . . }}

{get prop() { ... } }
{get [expression]() { ... } }

@prop       :: The name of the property to bind to the given function.
@expression :: Starting with ECMAScript 6, you can also use expressions for
               a computed property name to bind to the given function.

If you want to remove the getter, you can just delete it:
> delete obj.latest;

************************/


})
