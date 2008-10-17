GlobalStubs = [];

Screw.Unit.Extensions.Stub = {
  stub: function(obj, method_name, value) {
    this.register(obj, method_name);
    
    if(typeof(value) != "function") {
      var return_value = value;
      value = function() { return(return_value); };
    }
    obj[method_name] = value;
  },
  current_stubs: function() {
    return GlobalStubs;
  },
  register: function(obj, method_name) {
    var next_element = GlobalStubs.length;
    GlobalStubs[next_element] = [obj, method_name, obj[method_name]];
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
    
    for(i = 0; i < GlobalStubs.length; i++) {
      element = GlobalStubs[i];
      this.restore_method(element);
    }
  },
  reset_global_stubs: function() {
    GlobalStubs = [];
  }
}