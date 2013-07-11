// TODO: use Mocha

function fibo(n) {
  switch (n) {
    case 0:
      return 0
      break
    case 1:
      return 1
      break
    default:
      return fibo(n - 1) + fibo(n - 2)
      // return 'haha'
  }
}

fibo = Contract.callerContract(fibo, function(n) {
  if (_.isNumber(n))
    return true
  else
    return false
})

fibo = Contract.calleeContract(fibo, function(n) {
  if (_.isNumber(n))
    return true
  else
    return false
})

console.log(fibo('10'))