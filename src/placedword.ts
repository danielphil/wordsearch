import { Position } from "position";

export class PlacedWord {
    readonly word;
    readonly direction;
    readonly position;

    constructor(word: string, direction: number, position: Position) {
        this.word = word;
        this.direction = direction;
        this.position = position;
    }

    insertPositions(): Position[] {
        var positions = []
        // handle direction here!
        for (var i = 0; i < this.word.length; i++) {
            positions.push(new Position(this.position.x + i, this.position.y));
        }
        return positions;
    }
}