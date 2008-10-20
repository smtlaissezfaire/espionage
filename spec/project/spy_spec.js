Screw.Unit(function() {
  describe("Spy", function() {
    var obj;
    var spy;
    
    before(function() {
      obj = {};
      spy = Project.Helpers.clone(Project.Spy);
    });
    
    describe("spy_on", function() {
      before(function() {
        spy.reset(obj);
        obj.stub("foo");
      });
      
      it("should call the function given to spy_on", function() {
        var called = false;
        obj.foo = function() { called = true; };
        
        spy.spy_on(obj, function() {
          obj.foo();
        });
        
        expect(called).to(equal, true);
      });
      
      it("should report false when receiving a message", function() {
        spy.spy_on(obj, function() {
          expect(obj.received("foo")).to(be_false);
        });
      });
      
      it("should report true when receiving a message", function() {
        spy.spy_on(obj, function() {
          obj.foo();
          expect(obj.received("foo")).to(be_true);
        });
      });
      
      it("should be able to reset the received status", function() {
        spy.spy_on(obj, function() {
          obj.foo();
        });
        
        spy.reset(obj);
        
        expect(obj.received("foo")).to(be_false);
      });
      
      it("should report a positive message expectation on a different method", function() {
        obj.stub("bar");
        
        spy.spy_on(obj, function() {
          obj.bar();
          expect(obj.received("bar")).to(be_true);
        });
      });
      
      it("should not redefine a property which is not a method", function() {
        obj.bar = 7;
        
        spy.spy_on(obj, function() {
          expect(obj.bar).to(equal, 7);
        });
      });
      
      it("should be false when the wrong method is called", function() {
        spy.spy_on(obj, function() {
          obj.foo();
          expect(obj.received("bar")).to(be_false);
        });
      });
      
      it("should return false for a method which is not defined", function() {
        spy.spy_on(obj, function() {
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
        
        spy.spy_on(obj, function() {
          other_obj.foo(obj);
          expect(obj.received("bar")).to(be_true);
        });
      });
    });
  });
});
    