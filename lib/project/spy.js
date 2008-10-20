Project.Spy = function() {
  var received_messages = [];
  
  function convertToArray(obj) { 
    return Array.prototype.slice.call(obj);
  }
  
  function redefineMethod(obj, property) {
    var old_method = obj[property];
    obj[property] = function() {
      received_messages[received_messages.length] = {
        object: obj,
        property: property,
        arguments: [convertToArray(arguments)]
      };
      old_method();
    };
  }
  
  function redefineEachMethod(obj) {
    for (property in obj) {
      if (typeof(obj[property]) === "function") {
        redefineMethod(obj, property);
      }
    }
  }
  
  function findReceivedMethod(obj, method_name) {
    var received_methods;
    
    if(received_methods = findAllReceivedMethods(obj, method_name)) {
      return received_methods[0];
    }
  }
  
  function findAllReceivedMethods(obj, method_name) {
    var received_methods = [];
    
    jQuery.each(received_messages, function(index, message_pair) {
      if (message_pair.object === obj && message_pair.property === method_name) {
        var index = received_methods.length;
        received_methods[index] = message_pair;
      }
    });
    
    return received_methods;
  }
  
  function addReceivedMethod(obj) {
    obj.received = function(method_name) {
      return findReceivedMethod(obj, method_name) ? true : false;
    };
  }
  
  function addArgumentsForMethod(obj) {
    obj.argumentsFor = function(method_name) {
      var pairs = findAllReceivedMethods(obj, method_name);
      if (pairs.length != 0) {
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
  
  return {
    spyOn: function(obj, fun) {
      redefineEachMethod(obj);
      addMethods(obj);
      callFunction(fun);
    },
    reset: function(obj) {
      received_messages = [];
    }
  };
}();

