# contract-js

A JS library for [design-by-contract](http://en.wikipedia.org/wiki/Design_by_contract) programming.

## Overview

There are two types of contracts: caller contracts and callee contracts.  The former specifies the contraints on the arguments passed to the function, whereas the latter specifies the contraints on the returned value from the function.

## Usage

Firstly, require `contract-js`:

`require('contract')`

Or, if running in browser, simply include `contract.js`.

Then, specify your function and your contract(s):

```javascript
// We are using underscore.js for convenience

var multiply = function() {
  // This function multiplies its arguments
  return _.reduce(_.toArray(arguments), function(acc, x) {
    return acc * x
  }, 1)
}

var callerContract = function() {
  // This contract states that, for whatever reason,
  // the sum of all arguments need to be less than 10.
  var sum = _.reduce(_.toArray(arguments), function(acc, x) {
    return acc + x
  }, 0)

  return sum < 10
}

var calleeContract = function(result) {
  // This contract states that the return value has
  // to be greater than 10.
  return result > 10
}
```

Specifically, a caller contract should accept all arguments being passed to the function in question and return a value; if the value is truthy, then the contract is considered being honored; otherwise it's considered being violated.

The same for a callee contract, except that it accepts only one value, which is the returned value of the function in question.

Finally, set up the contracts:

```javascript
multiply = multiply.setCallerContract(callerContract)
multiply = multiply.setCalleeContract(calleeContract)
```

Now, you are ready to use your function!

By default, if a contract is violated, a exception will be thrown:

```javascript
multiply(1, 2, 3, 4) // will throw an exception
```

You may also pass in a callback function to customize what happens when a contract is violated:

```javascript
multiply = multiply.setCallerContract(callerContract, function(func) {
  return 'LOL the caller contract is violated!!'
})
```

The value returned by your callback function will be the returned value of your function, if the contract is violated.

## Run tests

Install [mocha](http://visionmedia.github.io/mocha/).  Then in terminal:

	npm install
	mocha