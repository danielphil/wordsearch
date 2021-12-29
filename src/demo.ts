import { GridSpec } from "gridspec";
import { ALL_DIRECTIONS, build } from "wordsearch";

function makeWordsearch() {
    const spec = new GridSpec(5, 2);
    const grid = build(["word", "toast"], spec, ALL_DIRECTIONS, "10");
    if (grid === null) {
        console.log("Couldn't fit all the words")
    } else {
        grid.toStrings().forEach(s => console.log(s));
    }
}

makeWordsearch();