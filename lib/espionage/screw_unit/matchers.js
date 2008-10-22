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
      var word;
      switch(number) {
        case 0:
          word = "no arguments";
          break;
        case 2:
          word = "two";
          break;
        case 3: 
          word = "three";
          break;
        default:
          word = number;
          break;
      }
      return word;
    }
    
    var argument = {
      match: function(__ignored__, object) {
        var argument_size = object.argumentsFor(message);
        if(argument_size) {
          var matching_elements = jQuery.grep(argument_size, function(element) {
            return number_of_times_called === element.length;
          });
          return matching_elements.length > 0 ? true : false;
        } else {
          return false;
        }
      },
      failure_message: function(__ignored__, object, negation) {
        if (negation) {
          return "Expected '" + message + "' not to be called with one argument, but it was";
        } else {
          var string = "Expected '" + message + "' to be called with one argument, but was ";
          var arguments_for = object.argumentsFor(message);
          var was_called = object.argumentsFor(message).length > 0;
          if(was_called) {
            var times_called = object.argumentsFor(message)[0].length;
            string += "called with " + wordify(times_called);
          } else {
            string += "not called";
          }

          return string;
        }
      }
    };
    
    return {
      match: function(__ignored__, object) {
        return haveBeenCalledOn(object).match(__ignored__, message);
      },
      failure_message: function(__ignored__, object, not) {
        return haveBeenCalledOn(object).failure_message(null, message, not);
      },
      With: function(number) {
        number_of_times_called = number;
        return this;
      },
      argument: argument,
      arguments: argument
    };
  };
  
  return {
    haveBeenCalledOn: haveBeenCalledOn,
    haveReceived:     haveReceived
  };
}();

Espionage.ScrewUnit.addMatchers();