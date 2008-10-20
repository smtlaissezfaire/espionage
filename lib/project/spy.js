Project.Spy = function() {
  var received_messages = [];
  
  function redefineMethod(obj, property) {
    var old_method = obj[property];
    obj[property] = function() {
      
      received_messages[received_messages.length] = {
        object: obj,
        property: property
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
  
  function addReceivedMethod(obj) {
    obj.received = function(method_name) {
      var return_message = false;
      
      jQuery.each(received_messages, function(index, message_pair) {
        if (message_pair.object === obj && message_pair.property === method_name) {
          return_message = true;
          return false;
        }
      });
      
      return return_message;
    };
  }
  
  function callFunction(fun) {
    fun.call();
  }
  
  return {
    spy_on: function(obj, fun) {
      redefineEachMethod(obj);
      addReceivedMethod(obj);
      callFunction(fun);
    },
    reset: function(obj) {
      received_messages = [];
    }
  };
}();

