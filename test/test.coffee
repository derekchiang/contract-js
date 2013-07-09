assert = require('should')
ContractJs = require('../')
Contract = ContractJs.Contract
validators = ContractJs.validators

###
The following test suite assumes that we are trying to build a
RPC service that accepts a request of the form:
  
  name: a string
  age: an integer
  height: a float
  
and returns one of the two:

  error: a string

  response: a string 'ok'
  ageNextYear: an integer
  heightNextYear: a float

###

describe 'validators',  ->
  describe '#isString',  ->
    it 'should accept a string and return true',  ->
      validators.isString("I'm a string").should.be.true
      validators.isString('').should.be.true
      validators.isString(new String()).should.be.true
      validators.isString(new String("I'm a string")).should.be.true

    it 'should accept a non-string and return false', ->
      validators.isString(1).should.be.false
      validators.isString([1, 2, 3]).should.be.false
      validators.isString({a: 1, b: 2}).should.be.false

  describe '#isInteger', ->
    it 'should accept an integer and return true', ->
      validators.isInteger(1).should.be.true
      validators.isInteger(-2).should.be.true

    it 'should accept a non-integer and return false', ->
      validators.isInteger('Haha').should.be.false
      validators.isInteger(2.13).should.be.false

  describe '#isFloat', ->
    it 'should accept a float and return true', ->
      validators.isFloat(2.0913).should.be.true
      validators.isFloat(-2.0913).should.be.true

    it 'should accept a non-float and return false', ->
      validators.isFloat('Haha').should.be.false
      validators.isFloat(1993).should.be.false

  describe '#isObject', ->
    it 'should accept a float and return true', ->
      validators.isObject(new Object()).should.be.true
      validators.isObject({a: 1, b: 2}).should.be.true

    it 'should accept a non-float and return false', ->
      validators.isObject('Haha').should.be.false
      validators.isObject(1993).should.be.false
      validators.isObject(->).should.be.false

  describe '#isFunction', ->
    it 'should accept a float and return true', ->
      validators.isFunction(->).should.be.true

    it 'should accept a non-float and return false', ->
      validators.isFunction('Haha').should.be.false
      validators.isFunction(1993).should.be.false

# describe 'Contract',  ->
#   describe '#constructor',  ->
#     it 'should accept two specs and store them as attributes',  ->
#       contract = Contract
#         name: 