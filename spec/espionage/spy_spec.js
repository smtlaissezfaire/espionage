describe("Spy", function() {
  before_each(function() {
    obj = {};
    spy = Espionage.Helpers.clone(Espionage.Spy);
  });
  
  describe("spyOn", function() {
    before_each(function() {
      spy.reset(obj);
      obj.stub("foo");
    });
    
    it("should call the function given to spyOn", function() {
      var called = false;
      obj.foo = function() { called = true; };
      
      spy.spyOn(obj, function() {
        obj.foo();
      });
      
      expect(called).to(equal, true);
    });
    
    it("should report false when receiving a message", function() {
      spy.spyOn(obj, function() {
        expect(obj.received("foo")).to(be_false);
      });
    });
    
    it("should report true when receiving a message", function() {
      spy.spyOn(obj, function() {
        obj.foo();
        expect(obj.received("foo")).to(be_true);
      });
    });
    
    it("should be able to reset the received status", function() {
      spy.spyOn(obj, function() {
        obj.foo();
      });
      
      spy.reset(obj);
      
      expect(obj.received("foo")).to(be_false);
    });
    
    it("should report a positive message expectation on a different method", function() {
      obj.stub("bar");
      
      spy.spyOn(obj, function() {
        obj.bar();
        expect(obj.received("bar")).to(be_true);
      });
    });
    
    it("should not redefine a property which is not a method", function() {
      obj.bar = 7;
      
      spy.spyOn(obj, function() {
        expect(obj.bar).to(equal, 7);
      });
    });
    
    it("should be false when the wrong method is called", function() {
      spy.spyOn(obj, function() {
        obj.foo();
        expect(obj.received("bar")).to(be_false);
      });
    });
    
    it("should return false for a method which is not defined", function() {
      spy.spyOn(obj, function() {
        expect(obj.received("baz")).to(be_false);
      });
    });
    
    it("should be true when called indirectly", function() {
      obj.stub("bar");
      
      var other_obj = {
        foo: function(obj) {
          obj.bar();
        }
      };
      
      spy.spyOn(obj, function() {
        other_obj.foo(obj);
        expect(obj.received("bar")).to(be_true);
      });
    });
  });
  
  describe("arguments", function() {
    before_each(function() {
      spy.reset(obj);
      obj.stub("foo");
    });
    
    it("should have an empty array of arguments when none are provided", function() {
      spy.spyOn(obj, function() {
        obj.foo();
        expect(obj.argumentsFor("foo").toString()).to(equal, [[]].toString());
      });
    });
    
    it("should have one argument when given", function() {
      spy.spyOn(obj, function() {
        obj.foo("bar");
        expect(obj.argumentsFor("foo").toString()).to(equal, [["bar"]].toString());
      });
    });
    
    it("should have two arguments when given", function() {
      spy.spyOn(obj, function() {
        obj.foo(1, 2);
        expect(obj.argumentsFor("foo").toString()).to(equal, [[1,2]].toString());
      });
    });
    
    it("should use the correct method", function() {
      obj.stub("bar");
      
      spy.spyOn(obj, function() {
        obj.bar(1, 2);
        expect(obj.argumentsFor("bar").toString()).to(equal, [[1,2]].toString());
      });
    });
    
    it("should return undefined if the method was never called", function() {
      spy.spyOn(obj, function() {
        expect(obj.argumentsFor("bar")).to(equal, undefined);
      });
    });
    
    it("should return an array when passed an array", function() {
      var an_object = {};
      an_object.stub("foo");
      
      spy.spyOn(an_object, function() {
        an_object.foo([]);
        expect(an_object.argumentsFor("foo").toString()).to(equal, [[[]]].toString());
      });
    });
    
    it("should return two pairs of arguments if called twice", function() {
      spy.spyOn(obj, function() {
        obj.foo();
        obj.foo();
        expect(obj.argumentsFor("foo").toString()).to(equal, [[], []].toString());
      });
    });
  });
  
  describe("namespacing", function() {
    it("should be able to call spyOn without calling spy inside the context of an example", function() {
      expect(spyOn === undefined).to(be_false);
    });
    
    it("should not polute the global namespace", function() {
      var obj = {};
      expect(obj.spyOn).to(equal, undefined);
    });
    
    it("should have spyOn as an alias for Espionage.Spy.spyOn", function() {
      expect(spyOn === Espionage.Spy.spyOn).to(be_true);
    });
  });
});