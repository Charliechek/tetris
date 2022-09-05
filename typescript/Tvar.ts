import { Poloha } from "./Poloha.js";

export class Tvar {

    private _matice: boolean[][];

    constructor(matice: boolean[][]) {
        this._matice = matice;
    }

    public get matice(): boolean[][] {
        return this._matice;
    }

    public vratPolohyCtvercu(aktualniPoloha: Poloha): Poloha[] {
        const polohyCtvercu: Poloha[] = [];
        for (let y: number = 1; y <= this.pocetRadku; y++) {
            for (let x: number = 1; x <= this.pocetSloupcu; x++) {
                if (this._matice[y - 1][x - 1] === true) {
                    const polohaCtverce: Poloha = this.vytvorPolohuCtverce(x, y, aktualniPoloha);
                    polohyCtvercu.push(polohaCtverce);
                }
            }
        }
        return polohyCtvercu;
    }

    public vratOtocenyTvar(): Tvar {
        const otocenaMatice: boolean[][] = [];
        for (let x: number = 0; x < this.pocetSloupcu; x++) {
            const radek: boolean[] = [];
            for (let y: number = this.pocetRadku - 1; y >= 0; y--) {
                radek.push(this._matice[y][x]);
            }
            otocenaMatice.push(radek);
        }
        return new Tvar(otocenaMatice);
    }

    private vytvorPolohuCtverce(x: number, y: number, aktualniPoloha: Poloha): Poloha {
        return new Poloha(
            aktualniPoloha.x + x - this.stredMatice.x,
            aktualniPoloha.y + y - this.stredMatice.y
        );
    }

    private get stredMatice(): Poloha {
        return new Poloha(
            Math.ceil(this.pocetSloupcu / 2),
            Math.ceil(this.pocetRadku / 2)
        );
    }

    private get pocetRadku(): number {
        return this._matice.length;
    }

    private get pocetSloupcu(): number {
        return this._matice[0].length;
    }
}