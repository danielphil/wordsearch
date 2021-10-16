import { PlacedWord } from "placedword";
import { Position } from "position";

var assert = require('assert');

describe('PlacedWord', function() {
  describe('#insertPositions', function() {
    const word = "test";
    it('leftToRight', function() {
      const pw = new PlacedWord(word, 0, new Position(5, 6));
      const positions = pw.insertPositions();
      assert.ok(positions.length === 4, "should be 4 positions");
      assert.deepStrictEqual(positions, [new Position(5, 6), new Position(6, 6), new Position(7, 6), new Position(8, 6)]);
    });
  });
});