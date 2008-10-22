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
                expect(matcher(obj).match(null, "foo")).to(be_true);
              });
            });
            
            it("should not match when the method hasn't been called", function() {
              spy.spyOn(obj, function() {
                expect(matcher(obj).match(null, "foo")).to(be_false);
              });
            });
          });
          
          describe("failure_message", function() {
            describe("positive failure message", function() {
              it("should have the correct failure message", function() {
                var message = "Expected 'foo' to be called";
                
                spy.spyOn(obj, function() {
                  expect(matcher(obj).failure_message(null, "foo", false)).to(equal, message);
                });
              });
                
              it("should use the proper message name", function() {
                spy.spyOn(obj, function() {
                  expect(matcher(obj).failure_message(null, "bar", false)).to(match, /bar/);
                });
              });
            });
            
            describe("negative failure_message", function() {
              it("should have the message expectation", function() {
                var message = "Expected 'foo' to not be called";
                
                spy.spyOn(obj, function() {
                  expect(matcher(obj).failure_message(null, "foo", true)).to(equal, message);
                });
              });
                
              it("should use the proper message name", function() {
                spy.spyOn(obj, function() {
                  expect(matcher(obj).failure_message(null, "bar", true)).to(match, /bar/);
                });
              });
            });
          });
        });
        
        it("should pass #haveBeenCalledOn when it's been invoked", function() {
          spy.spyOn(obj, function() {
            obj.foo();
            expect("foo").to(haveBeenCalledOn(obj));
          });
        });
        
        it("should fail #haveBeenCalledOn when it hasn't been invoked at all", function() {
          spy.spyOn(obj, function() {
            expect("foo").to_not(haveBeenCalledOn(obj));
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
                expect(matcher("foo").match(null, obj)).to(be_true);
              });
            });
            
            it("should not match when the method hasn't been called", function() {
              spy.spyOn(obj, function() {
                expect(matcher("foo").match(null, obj)).to(be_false);
              });
            });
          });
          
          describe("failure_message", function() {
            describe("positive failure message", function() {
              it("should have the correct failure message", function() {
                var message = "Expected 'foo' to be called";
        
                spy.spyOn(obj, function() {
                  expect(matcher("foo").failure_message(null, obj, false)).to(equal, message);
                });
              });
        
              it("should use the proper message name", function() {
                spy.spyOn(obj, function() {
                  expect(matcher("bar").failure_message(null, obj, false)).to(match, /bar/);
                });
              });
            });
            
            describe("negative failure_message", function() {
              it("should have the message expectation", function() {
                var message = "Expected 'foo' to not be called";
                    
                spy.spyOn(obj, function() {
                  expect(matcher("foo").failure_message(null, obj, true)).to(equal, message);
                });
              });
              
              it("should use the proper message name", function() {
                spy.spyOn(obj, function() {
                  expect(matcher("bar").failure_message(null, obj, true)).to(match, /bar/);
                });
              });
            });
          });
        });
      
        it("should pass #haveReceived when it's been invoked", function() {
          spy.spyOn(obj, function() {
            obj.foo();
            expect(obj).to(haveReceived("foo"));
          });
        });
        
        it("should fail #haveReceived when it hasn't been invoked at all", function() {
          spy.spyOn(obj, function() {
            expect(obj).to_not(haveReceived("foo"));
          });
        });
        
        describe("#With(1).argument", function() {
          it("should pass #haveReceived.with(1).argument when called with one argument", function() {
            spy.spyOn(obj, function() {
              obj.foo("bar");
              expect(obj).to(haveReceived("foo").With(1).argument);
            });
          });
          
          // PENDING:
          // it("should fail when passed two arguments", function() {
          //   spy.spyOn(obj, function() {
          //     obj.foo(1, 2);
          //     expect(obj).to_not(haveReceived("foo").With(2).arguments);
          //   });
          // });
          // 
          // it("should fail when passed zero arguments");
          // 
          // it("should fail when not called");
          
          describe("internals", function() {
            before(function() {
              matcher = Espionage.ScrewUnit.Matchers.haveReceived;
            });
            
            describe("with one argument", function() {
              it("should match when the message has been called with 1 arg", function() {
                spy.spyOn(obj, function() {
                  obj.foo("bar");
                  expect(matcher("foo").With(1).argument.match(null, obj)).to(be_true);
                });
              });

              it("should not match when the method hasn't been called at all", function() {
                spy.spyOn(obj, function() {
                  expect(matcher("foo").With(1).argument.match(null, obj)).to(be_false);
                });
              });
              
              it("should not match when the message has been called with 2 args", function() {
                spy.spyOn(obj, function() {
                  obj.foo("bar", 2);
                  expect(matcher("foo").With(1).argument.match(null, obj)).to(be_false);
                });
              });
              
              it("should match when the argument has been called twice, both times with one argument", function() {
                spy.spyOn(obj, function() {
                  obj.foo(1);
                  obj.foo(1);
                  expect(matcher("foo").With(1).argument.match(null, obj)).to(be_true);
                });
              });
              
              it("should match when the argument has been called twice, once with one arg, another with two args", function() {
                spy.spyOn(obj, function() {
                  obj.foo(1);
                  obj.foo(1, 2);
                  expect(matcher("foo").With(1).argument.match(null, obj)).to(be_true);
                });
              });
              
              it("should match when the argument has been called twice, once with one arg, another with two args, but in reverse order", function() {
                spy.spyOn(obj, function() {
                  obj.foo(1, 2);
                  obj.foo(1);
                  expect(matcher("foo").With(1).argument.match(null, obj)).to(be_true);
                });
              });
            });
          });
          
          describe("failure_message", function() {
            it("should return the message 'Expected 'foo' to be called with one argument, but was called with two'", function() {
              obj.stub("argumentsFor").andReturn([[1, 2]]);
              
              var result = haveReceived("foo").With(1).argument.failure_message(null, obj, false);
              expect(result).to(equal, "Expected 'foo' to be called with one argument, but was called with two");
            });
            
            it("should use the correct method name", function() {
              obj.stub("argumentsFor").andReturn([[1, 2]]);
              
              var result = haveReceived("bar").With(1).argument.failure_message(null, obj, false);
              expect(result).to(match, /bar/);
            });
            
            it("should use 'three' when called with three args", function() {
              obj.stub("argumentsFor").andReturn([[1, 2, 3]]);
              
              var result = haveReceived("foo").With(1).argument.failure_message(null, obj, false);
              expect(result).to(equal, "Expected 'foo' to be called with one argument, but was called with three");
            });
            
            it("should use '4' when called with four args", function() {
              obj.stub("argumentsFor").andReturn([[1, 2, 3, 4]]);
              
              var result = haveReceived("foo").With(1).argument.failure_message(null, obj, false);
              expect(result).to(match, /but was called with 4/);
            });
            
            it("should use '5' when called with four args", function() {
              obj.stub("argumentsFor").andReturn([[1, 2, 3, 4, 5]]);
              
              var result = haveReceived("foo").With(1).argument.failure_message(null, obj, false);
              expect(result).to(match, /5/);
            });

            it("should use '12' when called with 12 args", function() {
              obj.stub("argumentsFor").andReturn([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]]);
              
              var result = haveReceived("foo").With(1).argument.failure_message(null, obj, false);
              expect(result).to(match, /12/);
            });
            
            it("should use 'but was called with no arguments' when called with no arguments", function() {
              obj.stub("argumentsFor").andReturn([[]]);
              
              var result = haveReceived("foo").With(1).argument.failure_message(null, obj, false);
              expect(result).to(match, /but was called with no arguments/);
            });
            
            it("should use 'but was not called' when the function was not called at all", function() {
              obj.stub("argumentsFor").andReturn([]);
              
              var result = haveReceived("foo").With(1).argument.failure_message(null, obj, false);
              expect(result).to(match, /but was not called/);
            });
          });
          
          describe("negative failure message", function() {
            it("should use the string Expected 'foo' not to be called with one argument, but it was", function() {
              obj.stub("argumentsFor").andReturn([1]);
              
              var result = haveReceived("foo").With(1).argument.failure_message(null, obj, true);
              expect(result).to(equal, "Expected 'foo' not to be called with one argument, but it was");
            });
            
            it("should use the proper method name", function() {
              obj.stub("argumentsFor").andReturn([1]);
              
              var result = haveReceived("bar").With(1).argument.failure_message(null, obj, true);
              expect(result).to(match, /bar/);
            });
          });
          
          describe("arguments", function() {
            it("should have arguments as an alias for argument", function() {
              var obj = Espionage.ScrewUnit.Matchers.haveReceived();
              expect(obj.arguments).to(equal, obj.argument);
            });
          });
        });
      });
    });
  });
});