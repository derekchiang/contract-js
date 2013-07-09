// Generated by CoffeeScript 1.6.3
(function() {
  var validators;

  validators = {
    isString: function(arg) {
      return typeof arg === 'string' || arg instanceof String;
    },
    isInteger: function(arg) {
      return typeof arg === 'number' && parseFloat(arg) === parseInt(arg, 10) && !isNaN(arg);
    },
    isFloat: function(arg) {
      return arg === +arg && arg !== (arg | 0);
    }
  };

  module.exports = {
    validators: validators
  };

}).call(this);
