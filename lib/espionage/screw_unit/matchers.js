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
    var number_of_times_called;
    
    function wordify(number) {
      return (number === 0) ? "no arguments" : Espionage.Helpers.numberToWord(number);
    }
    
    var argument = {
      match: function(__ignored__, object) {
        var matching_elements,
            argument_size = object.argumentsFor(message);
        
        if (argument_size) {
          matching_elements = jQuery.grep(argument_size, function(element) {
            return number_of_times_called === element.length;
          });
          return matching_elements.length > 0 ? true : false;
        } else {
          return false;
        }
      },
      failure_message: function(__ignored__, object, negation) {
        var string = "Expected '" + message + "' ",
            arguments_for = object.argumentsFor(message),
            was_called = object.argumentsFor(message).length > 0;
            
        function times_called() {
          return arguments_for[0].length;
        }
        
        if (negation) {
          string += "not to be called with one argument, but it was";
        } else {
          string += "to be called with one argument, but was ";
          string += was_called ? "called with " + wordify(times_called()) : "not called";
        }
        
        return string;
      }
    };
    
    var arguments = argument;
    
    var match = function(__ignored__, object) {
      return haveBeenCalledOn(object).match(__ignored__, message);
    };
    
    var failure_message = function(__ignored__, object, not) {
      return haveBeenCalledOn(object).failure_message(null, message, not);
    };
    
    var With = function(number) {
      number_of_times_called = number;
      return this;
    };
    
    return {
      match:            match,
      failure_message:  failure_message,
      With:             With,
      argument:         argument,
      arguments:        arguments
    };
  };
  
  return {
    haveBeenCalledOn: haveBeenCalledOn,
    haveReceived:     haveReceived
  };
}();

Espionage.ScrewUnit.addMatchers();