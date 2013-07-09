validators =
  isString: (arg) ->
    typeof arg == 'string' or arg instanceof String

  # Attribute to:
  # http://stackoverflow.com/questions/3885817/
  # how-to-check-if-a-number-is-float-or-integer

  isInteger: (arg) ->
    typeof arg == 'number' and
      parseFloat(arg) == parseInt(arg, 10) and
      !isNaN(arg)

  isFloat: (arg) ->
    arg == +arg and arg != (arg|0)

module.exports =
  validators: validators
