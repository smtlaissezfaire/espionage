var path = require("path");

require.paths.unshift(path.join(__dirname, "jspec", "lib"));
require.paths.unshift(path.join(__dirname, "..", "lib"));

require('jspec');
require("espionage");

spy = Espionage;
stubber = spy.Stub;

JSpec.include({
  beforeSpec: function() {
    spy.tearDown();
  }
});

JSpec.
  exec('spec/espionage/helpers_spec.js').
  exec('spec/espionage/spy_spec.js').
  exec('spec/espionage/stub_spec.js').
  exec('spec/espionage/espionage_spec.js').
  exec('spec/espionage/global_spec.js').
  run({ reporter: JSpec.reporters.Terminal, fixturePath: 'spec/fixtures' }).
  report();
