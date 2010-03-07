describe("Espionage", function() {
  describe("global methods", function() {
    describe("stub", function() {
      before(function() {
        spy = Espionage;
        spy.tearDown();
      });

      it("should restore a prototype property appropriately", function() {
        var proto = {
          foo: "bar"
        };

        var obj = Espionage.Helpers.clone(proto);
        spy.stub("foo");

        spy.tearDown();

        obj.foo.should.equal("bar");
      });
    });

    describe("spy", function() {
      it("should restore a property appropriately", function() {
        // pending:
        // var fun = function() { return "original"; };
        //
        // var obj = {
        //   foo: fun
        // };
        //
        // spy.spyOn(obj, function() {
        // });
        //
        // spy.tearDown();
        // spy.Stub.tearDown();
        //
        // obj.foo.should.equal(fun);
      });
    });
  });
});
