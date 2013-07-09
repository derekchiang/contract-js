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

  isObject: (arg) ->
    arg != null and typeof arg == 'object'

  isFunction: (arg) ->
    getType = {};
    arg and getType.toString.call(arg) == '[object Function]';

module.exports =
  validators: validators
