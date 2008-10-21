Screw.Unit(function() {
  describe("Screw Unit Matchers", function() {
    var helper = Espionage.Helpers;
    
    describe("Method Expectations", function() {
      var spy_matcher;
      var spy;
      
      before(function() {
        spy_matcher = helper.clone(Espionage.ScrewUnit.Matchers.Spy);
        spy         = helper.clone(Espionage.Spy);
      });
      
      describe("#have_been_called_on", function() {
        var obj = {};
        
        before(function() {
          obj = {};
          obj.stub("foo");
        });
        
        describe("internals", function() {
          var matcher;
          
          before(function() {
            matcher = helper.clone(Espionage.ScrewUnit.Matchers.Spy).have_been_called_on;
          });
          
          describe("matching", function() {
            it("should match when the argument has been called", function() {
              spy.spyOn(obj, function() {
                obj.foo();
                expect(matcher.match(obj, "foo")).to(be_true);
              });
            });
            
            it("should not match when the method hasn't been called", function() {
              spy.spyOn(obj, function() {
                expect(matcher.match(obj, "foo")).to(be_false);
              });
            });
          });
          
          describe("failure_message", function() {
            
            describe("positive failure message", function() {
              it("should have the correct failure message", function() {
                var message = "Expected 'foo' to be called";

                spy.spyOn(obj, function() {
                  expect(matcher.failure_message(obj, "foo", false)).to(equal, message);
                });
              });

              it("should use the proper message name", function() {
                spy.spyOn(obj, function() {
                  expect(matcher.failure_message(obj, "bar", false)).to(match, /bar/);
                });
              });
            });
            
            describe("negative failure_message", function() {
              it("should have the message expectation", function() {
                var message = "Expected 'foo' to not be called";

                spy.spyOn(obj, function() {
                  expect(matcher.failure_message(obj, "foo", true)).to(equal, message);
                });
              });

              it("should use the proper message name", function() {
                spy.spyOn(obj, function() {
                  expect(matcher.failure_message(obj, "bar", true)).to(match, /bar/);
                });
              });
            });
          });
        });
        
        it("should pass #have_been_called_on when it's been invoked", function() {
          spy.spyOn(obj, function() {
            obj.foo();
            expect("foo").to(have_been_called_on, obj);
          });
        });
        
        it("should fail #have_been_called_on when it hasn't been invoked at all", function() {
          spy.spyOn(obj, function() {
            expect("foo").to_not(have_been_called_on, obj);
          });
        });
      });
    });
  });
});