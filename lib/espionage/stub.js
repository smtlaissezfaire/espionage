Espionage.Stub = function() {
  var stubs        = [];
  var current_stub = {};
  
  function restoreMethod(stub) {
    obj        = stub.object;
    message    = stub.methodName;
    definition = stub["function"];
      
    obj[message] = definition;
  }
  
  function register() {
    var next_element = stubs.length;
    var obj         = current_stub.object;
    var method_name = current_stub.methodName;
    
    stubs[next_element] = {
      "object":      obj,
      "methodName":  method_name,
      "function":    obj[method_name]
    };
  }
  
  function restoreEachGlobalStub() {
    jQuery.each(stubs.reverse(), function(index, stub) {
      restoreMethod(stub);
    });
  }
  
  function reset_global_stubs() {
    stubs = [];
  }
  
  function setValue(value) {
    var obj = current_stub.object;
    var method_name = current_stub.methodName;
    
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
        "methodName":  method_name,
        "value":       value
      };
      register();
      setValue(value);
      return this;
    },
    stubs: function() {
      return stubs;
    },
    teardown: function() {
      restoreEachGlobalStub();
      reset_global_stubs();
    },
    andReturn: function(value) {
      setValue(value);
    }
  };
}();

Object.prototype.stub = function(function_name) {
  return Espionage.Stub.stub(this, function_name);
};