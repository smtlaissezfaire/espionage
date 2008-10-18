Screw.Unit.Extensions.Stub = function() {
  var stubs = [];
  
  function restore_method(stub) {
    obj        = stub["object"];
    message    = stub["method_name"];
    definition = stub["function"];
      
    obj[message] = definition;
  }
  
  function register(obj, method_name) {
    var next_element = stubs.length;
    
    stubs[next_element] = {
      "object":      obj,
      "method_name": method_name, 
      "function":    obj[method_name]
    };
  }
  
  function restore_each_global_stub() {
    jQuery.each(stubs, function(index, stub) {
      restore_method(stub);
    });
  }
  
  function reset_global_stubs() {
    stubs = [];
  }
  
  return {
    stub: function(obj, method_name, value) {
      register(obj, method_name);
    
      if(typeof(value) != "function") {
        var return_value = value;
        value = function() { return(return_value); };
      }
      obj[method_name] = value;
    },
    stubs: function() {
      return stubs;
    },
    teardown: function() {
      restore_each_global_stub();
      reset_global_stubs();
    }
  };
}();