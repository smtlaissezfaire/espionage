describe("Stub", function() {
  before(function() {
    an_object = {};
    stubber = Espionage.Helpers.clone(Espionage.Stub);
    stubber.teardown();
  });
  
  describe("stubbing", function() {
    it("should add a method onto an object which doesn't have one", function() {
      stubber.stub(an_object, "foo");
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
    
    it("should replace a method definition, if it already exists", function() {
      var func = function() {};
      var obj = {
        func: func
      };
      
      stubber.stub(obj, "func");
      expect(an_object.func == func).to(be_false);
    });
  });
  
  describe("stubs", function() {
    before_each(function() {
      stubber.teardown();
    });
    
    it("should be an empty array to begin with", function() {
      expect(stubber.stubs().toString()).to(equal, [].toString());
    });
    
    it("should add an array of the object, method name, and previous definition of onto the stack when an object is stubbed", function() {
      var obj = {};
      stubber.stub(obj, "foo");
      
      var stub = stubber.stubs()[0];
      
      expect(stub.object).to(equal, obj);
      expect(stub.methodName).to(equal, "foo");
      expect(stub["function"]).to(equal, undefined);
    });
    
    it("should have 0 stubs at the start of the test case", function() {
      expect(stubber.stubs().length).to(equal, 0);
    });
    
    it("should use the correct method name", function() {
      var obj = {};
      stubber.stub(obj, "bar");
      expect(stubber.stubs()[0]["methodName"]).to(equal, "bar");
    });
    
    it("should have the old method definition", function() {
      var a_function = function() {};
      var obj = {};
      obj.foo = a_function;
      stubber.stub(obj, "foo");
      expect(stubber.stubs()[0]["function"]).to(equal, a_function);
    });
    
    it("should have two stubs when two objects are stubbed", function() {
      var obj1 = {};
      var obj2 = {};
      stubber.stub(obj1, "foo");
      stubber.stub(obj2, "foo");
      expect(stubber.stubs().length).to(equal, 2);
    });
  });
  
  describe("teardown", function() {
    it("should remove 1 global stub", function() {
      stubber.stub({}, "foo");
      stubber.teardown();
      expect(stubber.stubs().length).to(equal, 0);
    });
    
    it("should restore the method definition to the first stub", function() {
      var def = function() {};
      var obj = {
        def: def
      };
      stubber.stub(obj, "def");
      stubber.teardown();
      expect(obj.def).to(equal, def);
    });
    
    it("should restore the method definition to the second stub", function() {
      stubber.stub({}, "foo");
      
      var def = function() {};
      var obj = {
        def: def
      };
      stubber.stub(obj, "def");
      stubber.teardown();
      expect(obj.def).to(equal, def);
    });
    
    it("should restore the proper method definition if the method has been stubbed twice", function() {
      var func = function() {};
      var obj = { 
        func: func 
      };
    
      stubber.stub(obj, "func");
      stubber.stub(obj, "func");
      
      stubber.teardown();
      expect(obj.func).to(equal, func);
    });
  });
  
  describe("andReturn", function() {
    it("should set the value of the stub", function() {
      var obj = {};
      stubber.stub(obj, "foo").andReturn(1);
      expect(obj.foo()).to(equal, 1);
    });
    
    it("should set the correct value to the stub", function() {
      var obj = {};
      stubber.stub(obj, "foo").andReturn(2);
      expect(obj.foo()).to(equal, 2);
    });
    
    it("should return true", function() {});
  });
  
  describe("an object", function() {
    it("should have the stub method", function() {
      var obj = {};
      expect(typeof(obj.stub)).to(equal, "function");
    });
    
    it("should be able to stub a method", function() {
      var obj = {};
      obj.stub("foo");
      expect(typeof(obj.foo)).to(equal, "function");
    });
  
    it("should be able to set a return value on the stub", function() {
      var obj = {};
      obj.stub("foo").andReturn(1);
      expect(obj.foo()).to(equal, 1);
    });
  });
});