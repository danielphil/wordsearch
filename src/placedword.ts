import { Direction } from "direction";
import { Position } from "position";

export class PlacedWord {
    readonly word;
    readonly direction;
    readonly position;

    constructor(word: string, direction: Direction, position: Position) {
        this.word = word;
        this.direction = direction;
        this.position = position;
    }

    insertPositions(): Position[] {
        var positions = []
        // handle direction here!
        for (var i = 0; i < this.word.length; i++) {
            switch (this.direction) {
                case Direction.Right:
                    positions.push(new Position(this.position.x + i, this.position.y));
                    break;
                case Direction.Left:
                    positions.push(new Position(this.position.x - i, this.position.y));
                    break;
                case Direction.Up:
                    positions.push(new Position(this.position.x, this.position.y - i));
                    break;
                case Direction.Down:
                    positions.push(new Position(this.position.x, this.position.y + i));
                    break;
                case Direction.RightUp:
                    positions.push(new Position(this.position.x + i, this.position.y - i));
                    break;
                case Direction.LeftUp:
                    positions.push(new Position(this.position.x - i, this.position.y - i));
                    break;
                case Direction.RightDown:
                    positions.push(new Position(this.position.x + i, this.position.y + i));
                    break;
                case Direction.LeftDown:
                    positions.push(new Position(this.position.x - i, this.position.y + i));
                    break;
            }
        }
        return positions;
    }
}