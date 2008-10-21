Screw.Unit(function() {
  describe("Screw Unit Matchers", function() {
    var helper = Espionage.Helpers;
    
    describe("top-level matchers added to Screw.Unit", function() {
      it("should have the matcher haveBeenCalledOn", function() {
        expect(Screw.Matchers.haveBeenCalledOn).to(equal, Espionage.ScrewUnit.Matchers.haveBeenCalledOn);
      });
      
      it("should have the matcher haveReceived", function() {
        expect(Screw.Matchers.haveBeenCalledOn).to(equal, Espionage.ScrewUnit.Matchers.haveBeenCalledOn);
      });
    });
    
    describe("Method Expectations", function() {
      var spy_matcher;
      var spy;
      
      before(function() {
        spy_matcher = helper.clone(Espionage.ScrewUnit.Matchers);
        spy         = helper.clone(Espionage.Spy);
      });
      
      describe("#haveBeenCalledOn", function() {
        var obj = {};
        
        before(function() {
          obj = {};
          obj.stub("foo");
        });
        
        describe("internals", function() {
          var matcher;
          
          before(function() {
            matcher = helper.clone(Espionage.ScrewUnit.Matchers).haveBeenCalledOn;
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
        
        it("should pass #haveBeenCalledOn when it's been invoked", function() {
          spy.spyOn(obj, function() {
            obj.foo();
            expect("foo").to(haveBeenCalledOn, obj);
          });
        });
        
        it("should fail #haveBeenCalledOn when it hasn't been invoked at all", function() {
          spy.spyOn(obj, function() {
            expect("foo").to_not(haveBeenCalledOn, obj);
          });
        });
      });

      describe("#haveReceived", function() {
        var obj = {};
        
        before(function() {
          obj = {};
          obj.stub("foo");
        });
        
        describe("internals", function() {
          var matcher;
          
          before(function() {
            matcher = helper.clone(Espionage.ScrewUnit.Matchers).haveReceived;
          });
          
          describe("matching", function() {
            it("should match when the argument has been called", function() {
              spy.spyOn(obj, function() {
                obj.foo();
                expect(matcher.match("foo", obj)).to(be_true);
              });
            });
            
            it("should not match when the method hasn't been called", function() {
              spy.spyOn(obj, function() {
                expect(matcher.match("foo", obj)).to(be_false);
              });
            });
          });
          
          describe("failure_message", function() {
            describe("positive failure message", function() {
              it("should have the correct failure message", function() {
                var message = "Expected 'foo' to be called";
        
                spy.spyOn(obj, function() {
                  expect(matcher.failure_message("foo", obj, false)).to(equal, message);
                });
              });
        
              it("should use the proper message name", function() {
                spy.spyOn(obj, function() {
                  expect(matcher.failure_message("bar", obj, false)).to(match, /bar/);
                });
              });
            });
            
            describe("negative failure_message", function() {
              it("should have the message expectation", function() {
                var message = "Expected 'foo' to not be called";
        
                spy.spyOn(obj, function() {
                  expect(matcher.failure_message("foo", obj, true)).to(equal, message);
                });
              });
        
              it("should use the proper message name", function() {
                spy.spyOn(obj, function() {
                  expect(matcher.failure_message("bar", obj, true)).to(match, /bar/);
                });
              });
            });
          });
        });

        it("should pass #haveReceived when it's been invoked", function() {
          spy.spyOn(obj, function() {
            obj.foo();
            expect(obj).to(haveReceived, "foo");
          });
        });
        
        it("should fail #haveReceived when it hasn't been invoked at all", function() {
          spy.spyOn(obj, function() {
            expect(obj).to_not(haveReceived, "foo");
          });
        });
      });
    });
  });
});