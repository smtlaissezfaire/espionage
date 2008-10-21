Espionage.ScrewUnit = {};
Espionage.ScrewUnit.Matchers = function () {
  var have_been_called_on = {
    match: function(object, message) {
      return object.received(message);
    },
    failure_message: function(object, message, not) {
      return "Expected '" + message + "' to " + (not ? "not " : "") + "be called";
    }
  };
  
  var have_received = {
    match: function(message, object) {
      return have_been_called_on.match(object, message);
    },
    failure_message: function(message, object, not) {
      return have_been_called_on.failure_message(object, message, not);
    }
  };
  
  return {
    have_been_called_on: have_been_called_on,
    have_received:       have_received
  };
}();

Screw.Matchers.have_been_called_on = Espionage.ScrewUnit.Matchers.have_been_called_on;
Screw.Matchers.have_received       = Espionage.ScrewUnit.Matchers.have_received;