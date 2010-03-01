Espionage.Stub = function() {
  var stubs        = [],
      current_stub = {},
      each         = Espionage.Helpers.each;

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
    each(stubs.reverse(), function(index, stub) {
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

  var stub = function(obj, method_name, value) {
    current_stub = {
      "object":      obj,
      "methodName":  method_name,
      "value":       value
    };
    register();
    setValue(value);
    return this;
  };

  var global_stubs = function() {
    return stubs;
  };

  var teardown = function() {
    restoreEachGlobalStub();
    reset_global_stubs();
  };

  var andReturn = function(value) {
    setValue(value);
  };

  return {
    stub: stub,
    stubs: global_stubs,
    teardown: teardown,
    andReturn: andReturn
  };
}();

Object.prototype.stub = function(function_name) {
  return Espionage.Stub.stub(this, function_name);
};
