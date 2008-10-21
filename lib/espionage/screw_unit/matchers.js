Espionage.ScrewUnit = {};
Espionage.ScrewUnit.Matchers = function () {
  var have_been_called_on = {
    match: function(expected, actual) {
      return expected.received(actual);
    },
    failure_message: function(expected, actual, not) {
      return "Expected '" + actual + "' to " + (not ? "not " : "") + "be called";
    }
  };
  
  var have_received = {
    match: function(expected, actual) {
      return have_been_called_on.match(actual, expected);
    },
    failure_message: function(expected, actual, not) {
      return have_been_called_on.failure_message(actual, expected, not);
    }
  };
  
  return {
    have_been_called_on: have_been_called_on,
    have_received: have_received
  };
}();

Screw.Matchers.have_been_called_on = Espionage.ScrewUnit.Matchers.have_been_called_on;
Screw.Matchers.have_received       = Espionage.ScrewUnit.Matchers.have_received;