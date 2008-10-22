Espionage = {};
Espionage.Helpers = function() {
  var object = function(obj) {
    function F() {}
    F.prototype = obj;
    return new F();
  };
  
  var alias = function(obj, new_name, old_name) {
    obj[new_name] = obj[old_name];
  };
  
  var numberToWordMapper = function() {
    var mapping = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    var count = mapping.length;
    
    function throwIfInvalidNumber(number) {
      if (number < 0 || isNaN(number)) {
        throw({
          name: "TypeError", 
          message: "Invalid number. numberToWord only accepts positive integers"
        });
      }
    }
    
    function mapToString(number) {
      return mapping[number];
    }
    
    function numToString(number) {
      return parseInt(number, 10).toString();
    }
    
    function convertToString(number) {
      return (number >= count) ? numToString(number) : mapToString(number);
    }
    
    function map(number) {
      throwIfInvalidNumber(number);
      return convertToString(number);
    }
    
    return {
      map: map
    };
  }();
  
  var numberToWord = function(number) {
    return numberToWordMapper.map(number);
  };
  
  return {
    object:       object,
    alias:        alias,
    numberToWord: numberToWord 
  };
}();

Espionage.Helpers.alias(Espionage.Helpers, "clone", "object");
