Screw.Unit(function() {
  describe("Helpers", function() {
    var args = [];
    var mock_document = {
      write: function() {
        args = arguments;
      }
    };
    var helper = undefined;
    
    before(function() {
      // use classical, self like prototypes.
      // Thanks, Crockford.
      function object(o) {
        function F() {}
        F.prototype = o;
        return new F();
      }
      
      helper = object(Screw.Unit.Extensions.Helpers);
    })
    
    describe("include", function() {
      it("should insert the js file into the document", function() {
        helper.include("foo.js", mock_document);
        expect(args[0]).to(equal, '<script type="text/javascript" src="foo.js"></script>');
      });
      
      it("should insert the js file with the correct name", function() {
        helper.include("boo.js", mock_document);
        expect(args[0]).to(equal, '<script type="text/javascript" src="boo.js"></script>');
      });
      
      it("should use window.document when none is provided", function() {
        var message_received = false;
        
        helper.find_document = function() {
          message_received = true;
          return(mock_document);
        };
        
        helper.include("foo.js")
        expect(message_received).to(be_true);
      })
    });
    
    describe("find_document", function() {
      it("should return an empty object when the object passed is an empty object", function() {
        var obj = {}
        expect(helper.find_document(obj)).to(equal, obj);
      });

      it("should return the same object when the object passed in an empty object", function() {
        var obj = {
          foo: "bar"
        };
        expect(helper.find_document(obj)).to(equal, obj);
      });

      // pending: Why isn't this one passing?
      // it("should return window.document when no object is passed", function() {
      //   expect(helper.document()).to(equal, window.document);
      // });
    });
  });
});