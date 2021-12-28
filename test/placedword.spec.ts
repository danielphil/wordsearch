import { Direction } from "direction";
import { PlacedWord } from "../src/placedword";
import { Position } from "../src/position";

var assert = require('assert');

describe('PlacedWord', function() {
  describe('#insertPositions', function() {
    const word = "test";
    it('leftToRight', function() {
      testHelper(Direction.Right, [new Position(5, 6), new Position(6, 6), new Position(7, 6), new Position(8, 6)]);
    });

    it('rightToLeft', function() {
      testHelper(Direction.Left, [new Position(5, 6), new Position(4, 6), new Position(3, 6), new Position(2, 6)]);
    });

    it('up', function() {
      testHelper(Direction.Up, [new Position(5, 6), new Position(5, 5), new Position(5, 4), new Position(5, 3)]);
    });

    it('down', function() {
      testHelper(Direction.Down, [new Position(5, 6), new Position(5, 7), new Position(5, 8), new Position(5, 9)]);
    });

    it('rightUp', function() {
      testHelper(Direction.RightUp, [new Position(5, 6), new Position(6, 5), new Position(7, 4), new Position(8, 3)]);
    });

    it('rightDown', function() {
      testHelper(Direction.RightDown, [new Position(5, 6), new Position(6, 7), new Position(7, 8), new Position(8, 9)]);
    });

    it('leftUp', function() {
      testHelper(Direction.LeftUp, [new Position(5, 6), new Position(4, 5), new Position(3, 4), new Position(2, 3)]);
    });

    it('leftDown', function() {
      testHelper(Direction.LeftDown, [new Position(5, 6), new Position(4, 7), new Position(3, 8), new Position(2, 9)]);
    });
  });
});

function testHelper(direction: Direction, expectedPositions: Position[]) {
  const word = "test";
  const pw = new PlacedWord(word, direction, new Position(5, 6));
  const positions = pw.insertPositions();
  assert.ok(positions.length === 4, "should be 4 positions");
  assert.deepStrictEqual(positions, expectedPositions);
}