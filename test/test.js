"use strict"

require('../')
require('should')
var _ = require('underscore')

describe('ContractJS', function() {
  var callerContract, calleeContract, multiply

  beforeEach(function() {
    callerContract = function() {
      // This contract states that, for whatever reason,
      // the sum of all arguments need to be less than 10.
      var sum = _.reduce(_.toArray(arguments), function(acc, x) {
        return acc + x
      }, 0)

      return sum < 10
    }

    calleeContract = function(result) {
      // This contract states that the return value has
      // to be greater than 10.
      return result > 10
    }

    multiply = function() {
      // This function multiplies its arguments
      return _.reduce(_.toArray(arguments), function(acc, x) {
        return acc * x
      }, 1)
    }
  })

  describe('Caller Contract', function() {
    it('should work as usual if caller contract is not violated', function() {
      multiply = multiply.setCallerContract(callerContract)
      ;(function() {
        multiply(1, 2, 3).should.equal(6) // sanity check
      }).should.not.throw()
    })

    it('should work throw an exception if caller contract is ' + 
      'violated', function() {
      multiply = multiply.setCallerContract(callerContract)
      ;(function() {
        multiply(1, 2, 3, 4).should.equal(24) // sanity check
      }).should.throw()
    })

    it('should accept a custom callback and run it if ' +
      'the caller contract is violated', function() {
      multiply = multiply.setCallerContract(callerContract,
        function(func) {
        var args = _.toArray(arguments)
        args.shift()
        args.push(5)
        return args
      })
      ;(function() {
        multiply(1, 2, 3, 4).should.eql([1, 2, 3, 4, 5])
      }).should.not.throw()
    })
  })

  describe('Callee Contract', function() {
    it('should work as usual if callee contract is not violated', function() {
      multiply = multiply.setCalleeContract(calleeContract)
      ;(function() {
        multiply(1, 2, 3, 4).should.equal(24) // sanity check
      }).should.not.throw()
    })

    it('should work throw an exception if caller contract is ' + 
      'violated', function() {
      multiply = multiply.setCalleeContract(calleeContract)
      ;(function() {
        multiply(1, 2, 3).should.equal(6) // sanity check
      }).should.throw()
    })

    it('should accept a custom callback and run it if ' +
      'the callee contract is violated', function() {
      multiply = multiply.setCalleeContract(calleeContract, function() {
        return 'lol'
      })
      ;(function() {
        multiply(1, 2, 3).should.equal('lol')
      }).should.not.throw()
    })
  })
})