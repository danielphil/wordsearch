import { GridSpec } from "./gridspec";
import { RenderedGrid } from "./renderedgrid";
import { PlacedWord } from "./placedword";
import seedrandom from "seedrandom";
import { Direction } from "./direction";

export const BASIC_DIRECTIONS = [Direction.Right, Direction.Down];
export const BASIC_DIAGONAL_DIRECTIONS = [Direction.Right, Direction.Down, Direction.RightDown, Direction.RightUp];
export const ALL_DIRECTIONS = [Direction.Right, Direction.Left, Direction.Up, Direction.Down, Direction.RightUp, Direction.RightDown, Direction.LeftUp, Direction.LeftDown];

export function build(words: string[], spec: GridSpec, directions?: Direction[], randomSeed?: string): RenderedGrid|null {
    // order words largest to smallest
    const orderedWords = [...words].sort((a, b) => b.length - a.length);
    const rng = randomSeed ? seedrandom(randomSeed) : seedrandom();
    const placedWords = fit(orderedWords, [], spec, directions ?? ALL_DIRECTIONS, rng);
    if (placedWords === null) {
        return null;
    }
    return new RenderedGrid(spec, placedWords);
}

function fit(wordlist: string[], placedWords: PlacedWord[], gridSpec: GridSpec, directions: Direction[], rng: any): PlacedWord[]|null {
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
        const i = Math.min(Math.trunc(rng() * emptySpots.length), emptySpots.length - 1);
        const position = emptySpots.splice(i, 1)[0];

        const unusedDirections = [...directions];
        while (unusedDirections.length > 0) {
            const d = Math.min(Math.trunc(rng() * unusedDirections.length), unusedDirections.length - 1);
            const direction = unusedDirections.splice(d, 1)[0];

            const placedWord = new PlacedWord(currentWord, direction, position);
            if (currentGrid.tryPlaceWordInGrid(placedWord)) {
                const remainingWords = wordlist.length > 1 ? wordlist.slice(1 - wordlist.length) : [];
                const result = fit(remainingWords, placedWords.concat(placedWord), gridSpec, directions, rng);
                if (result !== null) {
                    return result;
                }
            }
        }
    }

    return null;
}
