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
  var haveBeenCalledOn = function(object) {
    return {
      match: function(__ignored__, message) {
        return object.received(message);
      },
      failure_message: function(__ignored__, message, not) {
        return "Expected '" + message + "' to " + (not ? "not " : "") + "be called";
      }
    };
  };
  
  var haveReceived = function(message) {
    return {
      match: function(__ignored__, object) {
        return haveBeenCalledOn(object).match(__ignored__, message);
      },
      failure_message: function(__ignored__, object, not) {
        return haveBeenCalledOn(object).failure_message(null, message, not);
      }
    };
  };
  
  return {
    haveBeenCalledOn: haveBeenCalledOn,
    haveReceived:     haveReceived
  };
}();

Espionage.ScrewUnit.addMatchers();