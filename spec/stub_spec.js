Screw.Unit(function() {
  describe("Stub", function() {
    
    var stubber = undefined;
    var an_object = undefined;
    var helper = Screw.Unit.Extensions.Helpers;
    
    before(function() {
      an_object = new Object;
      stubber = helper.clone(Screw.Unit.Extensions.Stub);
    });
    
    describe("stubbing", function() {
      it("should add a method onto an object which doesn't have one", function() {
        stubber.stub(an_object, "foo")
        expect(typeof(an_object.foo)).to(equal, "function");
      });

      it("should give the method the value specified", function() {
        stubber.stub(an_object, "foo", 7);
        expect(an_object.foo()).to(equal, 7);
      });

      it("should give the method the correct value specified", function() {
        stubber.stub(an_object, "foo", 8);
        expect(an_object.foo()).to(equal, 8);
      });

      it("should give it an undefined value if no value is specified", function() {
        stubber.stub(an_object, "foo");
        expect(an_object.foo()).to(equal, undefined);
      });

      it("should use the method definition given if a function is given", function() {
        var a_function = function() { };

        stubber.stub(an_object, "foo", a_function);
        expect(an_object.foo).to(equal, a_function);
      });
    });
    
    describe("current_stubs", function() {
      it("should be an empty array to begin with", function() {
        expect(stubber.current_stubs).to(equal, []);
      })
      
      it("should add an array of the object and method name of onto the stack when an object is stubbed", function() {
        var obj = {}
        stubber.stub(obj, "foo")
        expect(stubber.current_stubs[0]).to(equal, [obj, "foo", undefined]);
      })
    })
  });
});
  