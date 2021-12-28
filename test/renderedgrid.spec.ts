import { RenderedGrid } from "../src/renderedgrid";
import { GridSpec } from "../src/gridspec";
import { Position } from "../src/position";
import { PlacedWord } from "../src/placedword";
import { Direction } from "../src/direction";

var assert = require('assert');

describe('RenderedGrid', function() {
    describe('#emptyGrid', function() {
        it('checkEmpty', function() {
            const grid = new RenderedGrid(new GridSpec(4, 4), []);
            const emptySpots = grid.emptySpots();
            
            assert.equal(emptySpots.length, 16, "should be 4 positions");
            assert.deepEqual(emptySpots, [
                new Position(0, 0), new Position(1, 0), new Position(2, 0), new Position(3, 0),
                new Position(0, 1), new Position(1, 1), new Position(2, 1), new Position(3, 1),
                new Position(0, 2), new Position(1, 2), new Position(2, 2), new Position(3, 2),
                new Position(0, 3), new Position(1, 3), new Position(2, 3), new Position(3, 3)]
            );
        });
    });

    describe('#testPlacement', function() {
        const word = "test";

        it('checkLeftToRight', function() {
            runTest(4, 1, Direction.Right, new Position(0, 0), ["test"], [new Position(1, 0), new Position(0, 1)]);
        });

        it('checkRightToLeft', function() {
            runTest(4, 1, Direction.Left, new Position(3, 0), ["tset"], [new Position(2, 0), new Position(3, 1)]);
        });

        it('checkUp', function() {
            runTest(1, 4, Direction.Up, new Position(0, 3), ["t", "s", "e", 't'], [new Position(0, 2), new Position(1, 3)]);
        });

        it('checkDown', function() {
            runTest(1, 4, Direction.Down, new Position(0, 0), ["t", "e", "s", 't'], [new Position(0, 1), new Position(1, 0)]);
        });

        it('checkRightUp', function() {
            runTest(4, 4, Direction.RightUp, new Position(0, 3), ["   t", "  s ", " e  ", "t   "], [new Position(1, 3), new Position(0, 2)]);
        });

        it('checkRightDown', function() {
            runTest(4, 4, Direction.RightDown, new Position(0, 0), ["t   ", " e  ", "  s ", "   t"], [new Position(1, 0), new Position(0, 1)]);
        });

        it('checkLeftUp', function() {
            runTest(4, 4, Direction.LeftUp, new Position(3, 3), ["t   ", " s  ", "  e ", "   t"], [new Position(2, 3), new Position(3, 2)]);
        });

        it('checkLeftDown', function() {
            runTest(4, 4, Direction.LeftDown, new Position(3, 0), ["   t", "  e ", " s  ", "t   "], [new Position(2, 0), new Position(3, 1)]);
        });
    });

    describe('#overlap', function() {
        it('checkRightRejected', function() {
            const grid = new RenderedGrid(new GridSpec(4, 1), [
                new PlacedWord("test", Direction.Right, new Position(0, 0))
            ]);
            assert.ok(!grid.tryPlaceWordInGrid(new PlacedWord("tse", Direction.Left, new Position(3, 0))));
        });
        it('checkOverlapsOK', function() {
            const grid = new RenderedGrid(new GridSpec(4, 4), [
                new PlacedWord("test", Direction.Right, new Position(0, 0)),
                new PlacedWord("so", Direction.Left, new Position(1, 3))
            ]);
            assert.ok(grid.tryPlaceWordInGrid(new PlacedWord("eggs", Direction.Down, new Position(1, 0))));
            assert.ok(grid.tryPlaceWordInGrid(new PlacedWord("offt", Direction.RightUp, new Position(0, 3))));
        });
    });
});

function runTest(gridWidth: number, gridHeight: number, direction: Direction, startPosition: Position, expectedGrid: string[], failurePositions: Position[]) {
    const spec = new GridSpec(gridWidth, gridHeight);
    const grid = new RenderedGrid(spec, []);
    const word = "test";
    const placed = new PlacedWord(word, direction, startPosition);
    assert.ok(grid.tryPlaceWordInGrid(placed));
    check_grid(spec, [placed], expectedGrid);

    failurePositions.forEach(pos => {
        assert.ok(!grid.tryPlaceWordInGrid(new PlacedWord(word, direction, pos)));
    });
}

function check_grid(spec: GridSpec, words: PlacedWord[], expected: string[]) {
    const renderedGrid = new RenderedGrid(spec, words);
    for (let y = 0; y < spec.height; y++) {
        for (let x = 0; x < spec.width; x++) {
            const c = renderedGrid.charAt(x, y) ?? " ";
            assert.equal(c, expected[y].charAt(x));
        }
    }
}