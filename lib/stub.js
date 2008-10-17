var GlobalStubs = []

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
    GlobalStubs[next_element] = [obj, method_name, undefined];
  }
}