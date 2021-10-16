function makeWordsearch() {
    const spec = new GridSpec(5, 2);
    const result = fit(["word", "toast"], [], spec);
    if (result === null) {
        console.log("Couldn't fit all the words")
    } else {
        const grid = new RenderedGrid(spec, result);
        grid.toStrings().forEach(s => console.log(s));
    }
}

function fit(wordlist: string[], placedWords: PlacedWord[], gridSpec: GridSpec): PlacedWord[]|null {
    if (wordlist.length === 0) {
        return placedWords;
    }

	let currentGrid = new RenderedGrid(gridSpec, placedWords);
	
	// pick the first word from the list
	var currentWord = wordlist[0];
	
	// find all the remaining spots in the grid and randomly select one
	// randomly select an empty position in the grid
    const emptySpots = currentGrid.emptySpots();
    while (emptySpots.length > 0) {
        const i = Math.min(Math.trunc(Math.random() * emptySpots.length), emptySpots.length - 1);
        const position = emptySpots.splice(i, 1)[0];
        const placedWord = new PlacedWord(currentWord, 0, position);
        if (currentGrid.tryPlaceWordInGrid(placedWord)) {
            // TODO: fix this!!!!!!
            const remainingWords = wordlist.length > 1 ? wordlist.slice(1 - wordlist.length) : [];
            const result = fit(remainingWords, placedWords.concat(placedWord), gridSpec);
            if (result !== null) {
                return result;
            }
        }
    }

    return null;
}

makeWordsearch();