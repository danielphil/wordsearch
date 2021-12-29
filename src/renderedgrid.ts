import { Direction } from "direction";
import { GridSpec } from "gridspec";
import { PlacedWord } from "placedword";
import { Position } from "position";

export class RenderedGrid {
    readonly gridSpec;
    readonly grid: (string|null)[][];
    readonly directionGrid: (Direction|null)[][];

    constructor(gridSpec: GridSpec, placedWords: PlacedWord[]) {
        this.gridSpec = gridSpec;
        const newGrids = RenderedGrid.render(placedWords, gridSpec);
        this.grid = newGrids[0];
        this.directionGrid = newGrids[1];
    }

    charAt(x: number, y: number): string|null {
        return this.grid[y][x];
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

    logGrid() {
        this.toStrings().forEach(s => console.log(s));
    }

    tryPlaceWordInGrid(wordToPlace: PlacedWord): boolean {
        const positions = wordToPlace.insertPositions();
        
        for (let i = 0; i < positions.length; i++) {
            const position = positions[i];

            if (!this.gridSpec.isValidPosition(position)) {
                return false;
            }

            const gridChar = this.grid[position.y][position.x];
            const charToPlace = wordToPlace.word.charAt(i);
            if (gridChar && gridChar !== charToPlace) {
                return false;
            }
            const gridDir = this.directionGrid[position.y][position.x];
            // Don't allow words to completely overlap
            if (gridDir !== null && RenderedGrid.isOverlappingDirection(gridDir, wordToPlace.direction)) {
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

    private static render(placedWords: PlacedWord[], gridSpec: GridSpec): [(string|null)[][], (Direction|null)[][]] {
        let grid = RenderedGrid.createEmptyGrid<string>(gridSpec);
        let directionGrid = RenderedGrid.createEmptyGrid<Direction>(gridSpec);
        
        placedWords.forEach(placedWord => {
            let positions = placedWord.insertPositions();
            for (let i = 0; i < positions.length; i++) {
                let position = positions[i];
                grid[position.y][position.x] = placedWord.word.charAt(i);
                directionGrid[position.y][position.x] = placedWord.direction;
            }
        });
        
        return [grid, directionGrid];
    }

    private static createEmptyGrid<Type>(gridSpec: GridSpec) : (Type|null)[][] {
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

    private static isOverlappingDirection(a: Direction, b: Direction): boolean {    
        const overlaps = [
            new Set([Direction.Left, Direction.Right]),
            new Set([Direction.Up, Direction.Down]),
            new Set([Direction.RightUp, Direction.LeftDown]),
            new Set([Direction.RightDown, Direction.LeftUp])
        ];
    
        for (let i = 0; i < overlaps.length; i++) {
            const overlapSet = overlaps[i];
            if (overlapSet.has(a) && overlapSet.has(b)) {
                return true;
            }
        }
    
        return false;
    }
}