Espionage = {};
Espionage.Helpers = function() {
  var object = function(obj) {
    function F() {}
    F.prototype = obj;
    return new F();
  };

  var alias = function(obj, new_name, old_name) {
    obj[new_name] = obj[old_name];
  };

  var numberToWordMapper = function() {
    var mapping = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    var count = mapping.length;

    function throwIfInvalidNumber(number) {
      if (number < 0 || isNaN(number)) {
        throw({
          name: "TypeError",
          message: "Invalid number. numberToWord only accepts positive integers"
        });
      }
    }

    function mapToString(number) {
      return mapping[number];
    }

    function numToString(number) {
      return parseInt(number, 10).toString();
    }

    function convertToString(number) {
      return (number >= count) ? numToString(number) : mapToString(number);
    }

    function map(number) {
      throwIfInvalidNumber(number);
      return convertToString(number);
    }

    return {
      map: map
    };
  }();

  var numberToWord = function(number) {
    return numberToWordMapper.map(number);
  };

  var numberOfTimesInWords = function(number) {
    switch(number) {
      case 1:
        return "once";
      case 2:
        return "twice";
      default:
        return numberToWord(number) + " times";
    }
  };

  var hasProperty = function(obj, property) {
    for (p in obj) {
      if (p === property) {
        return true;
      }
    }

    return false;
  };

  // the following is coppied from jQuery

  // See test/unit/core.js for details concerning isFunction.
  // Since version 1.3, DOM methods and functions like alert
  // aren't supported. They return false on IE (#2968).
  var isFunction = function( obj ) {
    return toString.call(obj) === "[object Function]" || obj instanceof Function;
  };

  var grep = function( elems, callback, inv ) {
    var ret = [];

    // Go through the array, only saving the items
    // that pass the validator function
    for ( var i = 0, length = elems.length; i < length; i++ ) {
      if ( !inv !== !callback( elems[ i ], i ) ) {
        ret.push( elems[ i ] );
      }
    }

    return ret;
  };

  var map = function( elems, callback, arg ) {
    var ret = [], value;

    // Go through the array, translating each of the items to their
    // new value (or values).
    for ( var i = 0, length = elems.length; i < length; i++ ) {
      value = callback( elems[ i ], i, arg );

      if ( value != null ) {
        ret[ ret.length ] = value;
      }
    }

    return ret.concat.apply( [], ret );
  };

  var merge = function( first, second ) {
    var i = first.length, j = 0;

    if ( typeof second.length === "number" ) {
      for ( var l = second.length; j < l; j++ ) {
        first[ i++ ] = second[ j ];
      }

    } else {
      while ( second[j] !== undefined ) {
        first[ i++ ] = second[ j++ ];
      }
    }

    first.length = i;

    return first;
  };

  var makeArray = function( array, results ) {
    var ret = results || [];

    if ( array != null ) {
      // The window, strings (and functions) also have 'length'
      // The extra typeof function check is to prevent crashes
      // in Safari 2 (See: #3039)
      if ( array.length == null || typeof array === "string" || isFunction(array) || (typeof array !== "function" && array.setInterval) ) {
        push.call( ret, array );
      } else {
        merge( ret, array );
      }
    }

    return ret;
  };

  var each = function( object, callback, args ) {
    var name, i = 0,
      length = object.length,
      isObj = length === undefined || isFunction(object);

    if ( args ) {
      if ( isObj ) {
        for ( name in object ) {
          if ( callback.apply( object[ name ], args ) === false ) {
            break;
          }
        }
      } else {
        for ( ; i < length; ) {
          if ( callback.apply( object[ i++ ], args ) === false ) {
            break;
          }
        }
      }

    // A special, fast, case for the most common use of each
    } else {
      if ( isObj ) {
        for ( name in object ) {
          if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
            break;
          }
        }
      } else {
        for ( var value = object[0];
          i < length && callback.call( value, i, value ) !== false; value = object[++i] ) {}
      }
    }

    return object;
  };


  return {
    object:               object,
    alias:                alias,
    numberToWord:         numberToWord,
    numberOfTimesInWords: numberOfTimesInWords,
    hasProperty:          hasProperty,
    makeArray:            makeArray,
    isFunction:           isFunction,
    grep:                 grep,
    map:                  map,
    each:                 each
  };
}();

Espionage.Helpers.alias(Espionage.Helpers, "clone", "object");
