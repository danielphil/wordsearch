class RenderedGrid {
    readonly gridSpec;
    readonly grid: (string|null)[][];

    constructor(gridSpec: GridSpec, placedWords: PlacedWord[]) {
        this.gridSpec = gridSpec;
        this.grid = RenderedGrid.render(placedWords, gridSpec);
    }

    toStrings(): string[] {
        const result = [];
        for (let y = 0; y < this.gridSpec.height; y++) {
            let row = "";
            for (let x = 0; x < this.gridSpec.width; x++) {
                row += this.grid[y][x] + " ";
            }
            result.push(row);
        }
        return result;
    }

    tryPlaceWordInGrid(wordToPlace: PlacedWord): boolean {
        const positions = wordToPlace.insertPositions();
        
        for (let i = 0; i < positions.length; i++) {
            var position = positions[i];

            if (!this.gridSpec.isValidPosition(position)) {
                return false;
            }

            var gridChar = this.grid[position.y][position.x];
            var charToPlace = wordToPlace.word.charAt(i);
            if (gridChar && gridChar !== charToPlace) {
                return false;
            }
        }
        
        return true;
    }

    emptySpots(): Position[] {
        let emptySpots = [];
        for (let y = 0; y < this.gridSpec.height; y++) {
            for (let x = 0; x < this.gridSpec.width; x++) {
                if (this.grid[y][x] === null) {
                    emptySpots.push(new Position(x, y));
                }
            }
        }
        return emptySpots;
    }

    private static render(placedWords: PlacedWord[], gridSpec: GridSpec) {
        let grid = RenderedGrid.createEmptyGrid(gridSpec);
        
        placedWords.forEach(placedWord => {
            let positions = placedWord.insertPositions();
            for (let i = 0; i < positions.length; i++) {
                let position = positions[i];
                grid[position.y][position.x] = placedWord.word.charAt(i);
            }
        });
        
        return grid;
    }

    private static createEmptyGrid(gridSpec: GridSpec) : (string|null)[][] {
        var renderedGrid = []
        for (var row = 0; row < gridSpec.height; row++) {
            let newRow = []
            for (var col = 0; col < gridSpec.width; col++) {
                newRow.push(null);
            }
            renderedGrid.push(newRow);
        }
        return renderedGrid;
    }
}