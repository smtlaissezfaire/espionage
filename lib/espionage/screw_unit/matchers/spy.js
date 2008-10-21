Espionage.ScrewUnit = {
  Matchers: {
    Spy: {
      have_been_called_on: {
        match: function(expected, actual) {
          return expected.received(actual);
        },
        failure_message: function(expected, actual, not) {
          return "Expected '" + actual + "' to " + (not ? "not " : "") + "be called";
        }
      }
    }
  }
};

Screw.Matchers.have_been_called_on = Espionage.ScrewUnit.Matchers.Spy.have_been_called_on;