// test cases are described in fixtures.js
describe('stringifyJSON', function() {
  it('should match the result of calling JSON.stringify', function() {

    stringifiableObjects.forEach(function(test) {
      var expected = JSON.stringify(test);
      var result = stringifyJSON(test);
      expect(result).to.equal(expected);
    });

    unstringifiableValues.forEach(function(obj) {
      var expected = JSON.stringify(obj);
      var result = stringifyJSON(obj);
      expect(result).to.equal(expected);
    });

  });
});

var stringifyJSON = function(obj) {

  if (obj === null) {
    return 'null';
  }
  if (typeof obj === 'boolean' || typeof obj === 'number') {
    return obj.toString();
  }
  if (typeof obj === 'string' ) {
    return '"' + obj + '"';
  }
  if (typeof obj === 'function'){
    return '{}' ;
  }
  if (Array.isArray(obj)) {
    if (Array.isArray(obj) && obj.length === 0) {
      return '[]';
    } else {
      var string = stringifyJSON(obj.slice(1, obj.length));
      string = string.split('');
      if (obj.length > 1) {
        string.splice(1, 0, stringifyJSON(obj[0]) + ',');
      } else {
        string.splice(1, 0, stringifyJSON(obj[0]));
      }
      string = string.join('');
      return string;
    }
  }
  if (typeof obj === 'object' && !Array.isArray(obj)) {
    var keys = Object.keys(obj);
    var string = '{}';
    for (var i in keys) {
      string = string.split('');
      if (typeof obj[keys[i]] === 'function' || obj[keys[i]] === undefined) {
      } else if (Number(i) === keys.length - 1) {
        string.splice(string.length - 1, 0, stringifyJSON(keys[i]) + ':' + stringifyJSON(obj[keys[i]]));
      } else {
        string.splice(string.length - 1, 0, stringifyJSON(keys[i]) + ':' + stringifyJSON(obj[keys[i]]) + ',');
      }
      string = string.join('');
    }
    return string;
  }
};


