Screw.Unit.Extensions.Stub = {
  stub: function(obj, method_name, value) {
    if(typeof(value) != "function") {
      return_value = value;
      value = function() { return(return_value); };
    }
    obj[method_name] = value;
  }
}