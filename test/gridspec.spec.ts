import { GridSpec} from "gridspec";
import { Position } from "position";

var assert = require('assert');

describe('GridSpec', function() {
  describe('#isValidPosition', function() {
    const spec = new GridSpec(10, 20);
    it('should fail when x is too small', function() {
      assert.ok(!spec.isValidPosition(new Position(-1, 0)), "x position cannot be negative");
    });

    it('should fail when y is too small', function() {
      assert.ok(!spec.isValidPosition(new Position(0, -1)), "y position cannot be negative");
    });

    it('should pass when both are 0', function() {
      assert.ok(spec.isValidPosition(new Position(0, 0)), "(0, 0) should be valid");
    });
    
    it('should pass when both are just in the range', function() {
      assert.ok(spec.isValidPosition(new Position(9, 19)), "(9, 19) should be valid");
    });

    it('should fail when x is out of range', function() {
      assert.ok(!spec.isValidPosition(new Position(10, 19)), "x cannot be more than 9");
    });

    it('should fail when y is out of range', function() {
      assert.ok(!spec.isValidPosition(new Position(9, 20)), "y cannot be more than 19");
    });
  });
});