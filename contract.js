"use strict"

var _ = require('underscore')

;(function() {
  Object.defineProperty(Function.prototype, 'setCallerContract', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(contract, callback) {
      return (function(func) {
        if (_.isUndefined(callback)) {
          callback = function() {
            var args = _.toArray(arguments)
            args.shift()
            throw 'Caller contract violated.  Arguments: ' + args
          }
        }

        return function() {
          if (contract.apply(this, arguments)) {
            return func.apply(this, arguments)
          } else {
            return callback.apply(this, [func].concat(_.toArray(arguments)))
          }
        }
      })(this)
    }
  })

  Object.defineProperty(Function.prototype, 'setCalleeContract', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(contract, callback) {
      return (function(func) {
        if (_.isUndefined(callback)) {
          callback = function(func, result) {
            throw 'Callee contract violated.  Returned value: ' + result
          }
        }

        return function() {
          var result = func.apply(this, arguments)
          if (contract(result)) {
            return result
          } else {
            return callback.call(this, func, result)
          }
        }
      })(this)
    }
  })
}).call(this)