Espionage.Stub = function() {
  var stubs        = [],
      current_stub = {},
      each         = Espionage.Helpers.each,
      clone        = Espionage.Helpers.clone,
      hasProperty  = Espionage.Helpers.hasProperty;

  function restoreMethod(stub) {
    var obj        = stub.object,
        message    = stub.methodName,
        definition = stub["function"];

    if (stub.hasProperty) {
      obj[message] = definition;
    } else {
      delete(obj[message]);
    }
  }

  function register() {
    var next_element = stubs.length,
        obj          = current_stub.object,
        method_name  = current_stub.methodName;

    stubs[next_element] = clone(current_stub);
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

    if (typeof(value) != "function") {
      var return_value = value;
      value = function() { return(return_value); };
    }
    obj[method_name] = value;
  }

  var stub = function(obj, method_name, value) {
    current_stub = {
      "object":      obj,
      "methodName":  method_name,
      "function":    obj[method_name],
      "hasProperty": hasProperty(obj, method_name)
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

  return {
    stub: stub,
    stubs: global_stubs,
    teardown: teardown
  };
}();

Object.prototype.stub = function(function_name, value) {
  return Espionage.Stub.stub(this, function_name, value);
};