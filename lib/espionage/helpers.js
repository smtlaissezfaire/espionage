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
    alias: alias
  };
}();

Espionage.Helpers.alias(Espionage.Helpers, "clone", "object");
