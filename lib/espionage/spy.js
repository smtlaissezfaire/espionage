Espionage.Spy = function() {
  var received_messages = [];
  
  function redefineMethod(obj, property) {
    var old_method = obj[property];
    obj[property] = function() {
      received_messages[received_messages.length] = {
        object: obj,
        property: property,
        arguments: [jQuery.makeArray(arguments)]
      };
      old_method();
    };
  }
  
  function redefineEachMethod(obj) {
    for (property in obj) {
      if (jQuery.isFunction(obj[property])) {
        redefineMethod(obj, property);
      }
    }
  }
  
  function findReceivedMethod(obj, method_name) {
    var received_methods = findAllReceivedMethods(obj, method_name);
    
    if(received_methods) {
      return received_methods[0];
    }
  }
  
  function findAllReceivedMethods(obj, method_name) {
    return jQuery.grep(received_messages, function(message_pair) {
      if (message_pair.object === obj && message_pair.property === method_name) {
        return message_pair;
      }
    });
  }
  
  function addReceivedMethod(obj) {
    obj.received = function(method_name) {
      return findReceivedMethod(obj, method_name) ? true : false;
    };
  }
  
  function addArgumentsForMethod(obj) {
    obj.argumentsFor = function(method_name) {
      var pairs = findAllReceivedMethods(obj, method_name);
      if (pairs.length !== 0) {
        return jQuery.map(pairs, function(element) {
          return element.arguments;
        });
      }
    };
  }
  
  function addMethods(obj) {
    addReceivedMethod(obj);
    addArgumentsForMethod(obj);
  }
  
  function callFunction(fun) {
    fun.call();
  }
  
  var spyOn = function(obj, fun) {
    redefineEachMethod(obj);
    addMethods(obj);
    callFunction(fun);
  };
  
  var reset = function(obj) {
    received_messages = [];
  };
  
  return {
    spyOn: spyOn,
    reset: reset
  };
}();

var spyOn = Espionage.Spy.spyOn;