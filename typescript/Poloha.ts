export class Poloha {

    public readonly x: number;
    public readonly y: number;

    constructor(x: number = 5, y: number = 1) {
        this.x = x;
        this.y = y;
    }

    public get idCtverce(): string {
        return "#x" + this.x + "y" + this.y;
    }
}