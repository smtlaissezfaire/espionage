Espionage.ScrewUnit = function() {
  var addMatchers = function() {
    var matchers = Espionage.ScrewUnit.Matchers;
    
    for (property in matchers) {
      if (matchers.hasOwnProperty(property)) {
        Screw.Matchers[property] = matchers[property];
      }
    }
  };
  
  return {
    addMatchers: addMatchers
  };
}();

Espionage.ScrewUnit.Matchers = function () {
  var haveBeenCalledOn = {
    match: function(object, message) {
      return object.received(message);
    },
    failure_message: function(object, message, not) {
      return "Expected '" + message + "' to " + (not ? "not " : "") + "be called";
    }
  };
  
  var haveReceived = {
    match: function(message, object) {
      return haveBeenCalledOn.match(object, message);
    },
    failure_message: function(message, object, not) {
      return haveBeenCalledOn.failure_message(object, message, not);
    }
  };
  
  return {
    haveBeenCalledOn: haveBeenCalledOn,
    haveReceived:     haveReceived
  };
}();

Espionage.ScrewUnit.addMatchers();