import { Direction } from "direction";
import { RenderedGrid } from "renderedgrid";
import { ALL_DIRECTIONS, BASIC_DIAGONAL_DIRECTIONS, BASIC_DIRECTIONS, build } from "wordsearch";
import { GridSpec} from "../src/gridspec";
import { Position } from "../src/position";

var assert = require('assert');

describe('Wordsearch', function() {
    describe('#regressionTests', function() {
        const randomSeed = "1234";
        it('basic grid', function() {
            const spec = new GridSpec(5, 2);
            const grid = build(["word", "toast"], spec, BASIC_DIRECTIONS, randomSeed);
            check_grid(spec, grid!, [" word", "toast"]);
        });

        it('diagonal grid', function() {
            const spec = new GridSpec(5, 5);
            const grid = build(["word", "toast"], spec, [Direction.RightDown, Direction.RightUp], randomSeed);
            check_grid(spec, grid!, ["t    ", "wo   ", " oa  ", "  rs ", "   dt"]);
        });

        it('all directions', function() {
            const spec = new GridSpec(5, 5);
            const grid = build(["word", "toast", "some", "road", "dasio", "assir"], spec, ALL_DIRECTIONS, randomSeed);
            check_grid(spec, grid!, ["some ", "rissa", "tsaot", "daor ", " drow"]);
        });

        it('not enough space', function() {
            const spec = new GridSpec(5, 1);
            const grid = build(["word", "toast"], spec, ALL_DIRECTIONS, randomSeed);
            assert.equal(grid, null);
        });
    });
});

function check_grid(spec: GridSpec, grid: RenderedGrid, expected: string[]) {
    for (let y = 0; y < spec.height; y++) {
        for (let x = 0; x < spec.width; x++) {
            const c = grid.charAt(x, y) ?? " ";
            assert.equal(c, expected[y].charAt(x));
        }
    }
}