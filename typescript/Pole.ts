import { Kostka } from "./Kostka.js";
import { Poloha } from "./Poloha.js";

export class Pole {

    private elPole: HTMLDivElement;
    private pocetSirka: number = 9;
    private pocetVyska: number = 20;
    private pxVelikostCtverce: number = 20;
    private spadleKostky: Kostka[] = [];

    constructor(selektorPole: string) {
        const elPole: HTMLDivElement|null = document.querySelector(selektorPole);
        if (elPole === null) {
            throw new Error("Element 'pole' nebyl nalezen.");
        }
        this.elPole = elPole;
    }

    public pridejDoSpadlychKostek(kostka: Kostka): void {
        this.spadleKostky.push(kostka);
    }

    public vytvorPole(): void {
        for (let y: number = 1; y <= this.pocetVyska; y++) {
            for (let x: number = 1; x <= this.pocetSirka; x++) {
                const ctverec: HTMLDivElement = this.vytvorCtverec();
                ctverec.id = "x" + x + "y" + y;
                if (x === 1) {
                    ctverec.style.clear = "left";
                }
                this.elPole.appendChild(ctverec);
            }
        }
    }

    public jsouValidniPolohy(polohy: Poloha[]): boolean {
        for (let poloha of polohy) {
            const id: string = poloha.idCtverce;
            if (this.neniIdExistujicihoCtverce(id) || this.jeIdCtverceSpadleKostky(id)) {
                return false;
            }
        }
        return true;
    }

    private neniIdExistujicihoCtverce(id: string): boolean {
        return document.querySelector(id) === null;
    }

    private jeIdCtverceSpadleKostky(id: string): boolean {
        for (let spadlaKostka of this.spadleKostky) {
            for (let idSpadleKostky of spadlaKostka.vratIdCtvercuKostky()) {
                if (id == idSpadleKostky) {
                    return true;
                }
            }
        }
        return false;
    }

    private vytvorCtverec(): HTMLDivElement {
        const ctverec = document.createElement("div");
        ctverec.style.width = this.pxVelikostCtverce + "px";
        ctverec.style.height = this.pxVelikostCtverce + "px";
        ctverec.style.display = "inline-block";
        ctverec.style.float = "left";
        return ctverec;
    }
}