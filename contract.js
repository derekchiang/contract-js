_ = require('underscore')

Contract = {
  callerContract: function(func, contract, callback) {
    if (_.isUndefined(callback)) {
      callback = function() {
        console.log('Caller contract violated.  Arguments:')
        console.log(_.toArray(arguments))
        return func.apply(this, arguments)
      }
    }

    return function() {
      if (contract.apply(this, arguments)) {
        return func.apply(this, arguments)
      } else {
        return callback.apply(this, arguments)
      }
    }
  },
  calleeContract: function(func, contract, callback) {
    if (_.isUndefined(callback)) {
      callback = function(result) {
        console.log('Callee contract violated.  Returned value:')
        console.log(result)
        return result
      }
    }

    return function() {
      result = func.apply(this, arguments)
      if (contract(result)) {
        return result
      } else {
        return callback(result)
      }
    }
  }
}