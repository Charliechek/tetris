import { Ctverec } from "./Ctverec.js";
import { Kostka } from "./Kostka.js";
import { Poloha } from "./Poloha.js";

export class Pole {

    private elPole: HTMLDivElement;
    private pocetSirka: number = 9;
    private pocetVyska: number = 20;
    private pxVelikostCtverce: number = 20;
    private spadleKostky: Kostka[] = [];

    constructor(selektorPole: string) {
        const elPole: HTMLDivElement | null = document.querySelector(selektorPole);
        if (elPole === null) {
            throw new Error("Element pole nebyl nalezen.");
        }
        this.elPole = elPole;
    }
    
    public vytvorPole(): void {
        for (let y: number = 1; y <= this.pocetVyska; y++) {
            for (let x: number = 1; x <= this.pocetSirka; x++) {
                const ctverec: Ctverec = this.vytvorCtverec(x, y);
                ctverec.vymaz();
                this.elPole.appendChild(ctverec.vratHTMLElement());
            }
        }
    }

    public pridejDoSpadlychKostek(kostka: Kostka): void {
        this.spadleKostky.push(kostka);
    }
    
    public jsouValidniPolohy(polohy: Poloha[]): boolean {
        for (let poloha of polohy) {
            if (this.jePolohaMimoOblastPole(poloha) || this.jePolohaCtverceSpadleKostky(poloha)) {
                return false;
            }
        }
        return true;
    }

    private jePolohaMimoOblastPole(poloha: Poloha): boolean {
        return (poloha.x < 1 || poloha.x > this.pocetSirka || poloha.y > this.pocetVyska);
    }

    private jePolohaCtverceSpadleKostky(poloha: Poloha): boolean {
        for (let spadlaKostka of this.spadleKostky) {
            for (let polohaCtverceSpadleKostky of spadlaKostka.vratPolohyCtvercu()) {
                if (poloha.idCtverce === polohaCtverceSpadleKostky.idCtverce) {
                    return true;
                }
            }
        }
        return false;
    }

    private vytvorCtverec(x: number, y: number): Ctverec {
        const elCtverec = document.createElement("div");
        elCtverec.style.width = this.pxVelikostCtverce + "px";
        elCtverec.style.height = this.pxVelikostCtverce + "px";
        elCtverec.style.display = "inline-block";
        elCtverec.style.float = "left";
        elCtverec.id = "x" + x + "y" + y;
        if (x === 1) {
            elCtverec.style.clear = "left";
        }
        return new Ctverec(elCtverec);
    }
}