Screw.Unit.Extensions.Stub = function() {
  var stubs = [];
  
  return {
    stub: function(obj, method_name, value) {
      this.register(obj, method_name);
    
      if(typeof(value) != "function") {
        var return_value = value;
        value = function() { return(return_value); };
      }
      obj[method_name] = value;
    },
    current_stubs: function() {
      return stubs;
    },
    register: function(obj, method_name) {
      var next_element = stubs.length;
      stubs[next_element] = [obj, method_name, obj[method_name]];
    },
    teardown: function() {
      this.restore_each_global_stub();
      this.reset_global_stubs();
    },
    restore_method: function() {
      data = arguments[0];
      obj = data[0];
      message = data[1];
      definition = data[2];
    
      obj[message] = definition;
    },
    restore_each_global_stub: function() {
      var i = 0;
      var element = undefined;
    
      for(i = 0; i < stubs.length; i++) {
        element = stubs[i];
        this.restore_method(element);
      }
    },
    reset_global_stubs: function() {
      stubs = [];
    }
  };
}();