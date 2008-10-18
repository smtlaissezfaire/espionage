Screw.Unit.Extensions.Stub = function() {
  var stubs        = [];
  var current_stub = {};
  
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
    jQuery.each(stubs.reverse(), function(index, stub) {
      restore_method(stub);
    });
  }
  
  function reset_global_stubs() {
    stubs = [];
  }
  
  function set_value(obj, method_name, value) {
    if(typeof(value) != "function") {
      var return_value = value;
      value = function() { return(return_value); };
    }
    obj[method_name] = value;
  }
  
  return {
    stub: function(obj, method_name, value) {
      current_stub = {
        "object":      obj,
        "method_name": method_name,
        "function":    value
      };
      register(obj, method_name);
      set_value(obj, method_name, value);
      return(this);
    },
    stubs: function() {
      return stubs;
    },
    teardown: function() {
      restore_each_global_stub();
      reset_global_stubs();
    },
    and_return: function(value) {
      set_value(current_stub["object"], current_stub["method_name"], value);
    }
  };
}();

Object.prototype.stub = function(function_name) {
  return Screw.Unit.Extensions.Stub.stub(this, function_name);
};