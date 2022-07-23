import { Ctverec } from "./Ctverec.js";
import { Poloha } from "./Poloha.js";

export class Ctverce {

    private readonly pxVelikostCtverce: number = 20;
    private readonly pocetSloupcu: number;
    private readonly pocetRadku: number;

    private ctverce: Ctverec[][] = [];

    constructor(pocetRadku: number, pocetSloupcu: number) {
        this.pocetRadku = pocetRadku;
        this.pocetSloupcu = pocetSloupcu;
    }

    public vytvorCtverce(): void {
        for (let y: number = 1; y <= this.pocetRadku; y++) {
            for (let x: number = 1; x <= this.pocetSloupcu; x++) {
                const ctverec: Ctverec = this.vytvorCtverec(x);   
                if (this.ctverce[y] === undefined) {
                    this.ctverce[y] = [];
                }             
                this.ctverce[y][x] = ctverec;
            }
        }
    }

    public aplikujFunkciProKazdyCtverec(funkce: CallableFunction): void {
        this.ctverce.forEach((radek) => radek.forEach((ctverec) => funkce(ctverec)));
    }

    public vratCtverec(poloha: Poloha): Ctverec {
        return this.ctverce[poloha.y]?.[poloha.x];
    }

    private vytvorCtverec(x: number): Ctverec {
        const elCtverec = document.createElement("div");
        elCtverec.style.width = this.pxVelikostCtverce + "px";
        elCtverec.style.height = this.pxVelikostCtverce + "px";
        elCtverec.style.display = "inline-block";
        elCtverec.style.float = "left";
        if (x === 1) {
            elCtverec.style.clear = "left";
        }
        return new Ctverec(elCtverec);
    }
}