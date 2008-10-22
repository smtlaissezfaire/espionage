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
  
  return {
    object: object,
    alias: alias,
    numberToWord: function(number) {
      var mapping = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
      var mapping_count = mapping.length;
      
      if (number < 0 || isNaN(number)) {
        throw({name: "TypeError", message: "Invalid number. numberToWord only accepts positive integers"});
      }
      
      if(number >= mapping_count) {
        return parseInt(number, 10).toString();
      } else {
        return mapping[number];
      }
    }
  };
}();

Espionage.Helpers.alias(Espionage.Helpers, "clone", "object");
