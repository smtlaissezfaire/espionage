Screw.Unit.Extensions.Stub = function() {
  var stubs = [];
  
  function restore_method() {
    data = arguments[0];
    obj = data[0];
    message = data[1];
    definition = data[2];
  
    obj[message] = definition;
  };
  
  function register(obj, method_name) {
    var next_element = stubs.length;
    stubs[next_element] = [obj, method_name, obj[method_name]];
  };
  
  function restore_each_global_stub() {
    var i = 0;
    var element = undefined;
  
    for(i = 0; i < stubs.length; i++) {
      element = stubs[i];
      restore_method(element);
    }
  };
  
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
      this.reset_global_stubs();
    },
    reset_global_stubs: function() {
      stubs = [];
    }
  };
}();