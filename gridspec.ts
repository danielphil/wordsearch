class GridSpec {
    readonly width;
    readonly height;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    isValidPosition(pos: Position) {
        return pos.x >= 0 && pos.y >= 0 && pos.x < this.width && pos.y < this.height;
    }
}