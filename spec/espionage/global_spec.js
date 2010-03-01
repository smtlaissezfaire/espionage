describe("Espionage", function() {
  describe("global methods", function() {
    describe("stub", function() {
      it("should stub a value on an object", function() {
        var obj = {};
        obj.stub("foo", 1);
        obj.foo().should.equal(1);
      });

      it("should stub a value on an object as undefined if not given", function() {
        var obj = {};
        obj.stub("foo");
        obj.foo().should.equal(undefined);
      });
    });
  });
});
