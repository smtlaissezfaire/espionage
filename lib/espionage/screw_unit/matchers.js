Espionage.ScrewUnit = {
  Matchers: {
    have_been_called_on: {
      match: function(expected, actual) {
        return expected.received(actual);
      },
      failure_message: function(expected, actual, not) {
        return "Expected '" + actual + "' to " + (not ? "not " : "") + "be called";
      }
    },
    have_received: {
      match: function(actual, expected) {
        return expected.received(actual);
      },
      failure_message: function(actual, expected, not) {
        return "Expected '" + actual + "' to " + (not ? "not " : "") + "be called";
      }
    }
  }
};

Screw.Matchers.have_been_called_on = Espionage.ScrewUnit.Matchers.have_been_called_on;
Screw.Matchers.have_received       = Espionage.ScrewUnit.Matchers.have_received;