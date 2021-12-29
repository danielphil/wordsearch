import { RenderedGrid } from "renderedgrid";
import { build } from "wordsearch";
import { GridSpec} from "../src/gridspec";
import { Position } from "../src/position";

var assert = require('assert');

describe('Wordsearch', function() {
    describe('#regressionTests', function() {
        const randomSeed = "1234";
        it('basic grid', function() {
            //assert.ok(!spec.isValidPosition(new Position(-1, 0)), "x position cannot be negative");
            const spec = new GridSpec(5, 2);
            const grid = build(["word", "toast"], spec, randomSeed);
            grid!.toStrings().forEach(s => console.log(s));
            check_grid(spec, grid!, ["toast ", " word"]);
        });

        it('not enough space', function() {
            //assert.ok(!spec.isValidPosition(new Position(-1, 0)), "x position cannot be negative");
            const spec = new GridSpec(5, 1);
            const grid = build(["word", "toast"], spec, randomSeed);
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