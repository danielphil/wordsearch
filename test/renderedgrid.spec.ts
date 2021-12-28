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
            const spec = new GridSpec(4, 1);
            const grid = new RenderedGrid(spec, []);
            const placed = new PlacedWord(word, Direction.Right, new Position(0, 0));
            assert.ok(grid.tryPlaceWordInGrid(placed));
            check_grid(spec, [placed], ["test"]);

            assert.ok(!grid.tryPlaceWordInGrid(new PlacedWord(word, Direction.Right, new Position(1, 0))));
            assert.ok(!grid.tryPlaceWordInGrid(new PlacedWord(word, Direction.Right, new Position(0, 1))));
        });

        it('checkRightToLeft', function() {
            const spec = new GridSpec(4, 1);
            const grid = new RenderedGrid(spec, []);
            const placed = new PlacedWord(word, Direction.Left, new Position(3, 0));
            assert.ok(grid.tryPlaceWordInGrid(placed));
            check_grid(spec, [placed], ["tset"]);

            assert.ok(!grid.tryPlaceWordInGrid(new PlacedWord(word, Direction.Right, new Position(2, 0))));
            assert.ok(!grid.tryPlaceWordInGrid(new PlacedWord(word, Direction.Right, new Position(3, 1))));
        });
    });
});

function check_grid(spec: GridSpec, words: PlacedWord[], expected: string[]) {
    const renderedGrid = new RenderedGrid(spec, words);
    for (let y = 0; y < spec.height; y++) {
        for (let x = 0; x < spec.width; x++) {
            assert.equal(renderedGrid.charAt(x, y), expected[y].charAt(x));
        }
    }
}