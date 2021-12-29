import { GridSpec } from "gridspec";
import { build } from "wordsearch";

function makeWordsearch() {
    const spec = new GridSpec(5, 2);
    const grid = build(["word", "toast"], spec, "10");
    if (grid === null) {
        console.log("Couldn't fit all the words")
    } else {
        grid.toStrings().forEach(s => console.log(s));
    }
}

makeWordsearch();