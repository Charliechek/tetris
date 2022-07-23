import { Ctverce } from "./Ctverce.js";
import { Ctverec } from "./Ctverec.js";
import { Kostka } from "./Kostka.js";
import { Poloha } from "./Poloha.js";
import { SpadleKostky } from "./SpadleKostky.js";

export class Pole {

    private readonly pocetSloupcu: number = 9;
    private readonly pocetRadku: number = 20;
    private elPole: HTMLDivElement;
    private ctverce: Ctverce;
    private spadleKostky: SpadleKostky;

    constructor(selektorPole: string) {
        const elPole: HTMLDivElement | null = document.querySelector(selektorPole);
        if (elPole === null) {
            throw new Error("Element pole nebyl nalezen.");
        }
        this.elPole = elPole;
        this.ctverce = new Ctverce(this.pocetRadku, this.pocetSloupcu);
        this.spadleKostky = new SpadleKostky(this.pocetSloupcu);
    }
    
    public vytvorPole(): void {
        this.ctverce.vytvorCtverce();
        this.pridejCtverceDoPole();
        this.vymazVsechnyCtverce();
    }
    
    public jsouValidniPolohy(polohy: Poloha[]): boolean {
        for (let poloha of polohy) {
            if (this.jePolohaMimoOblastPole(poloha) || this.spadleKostky.jePolohaCtverceSpadleKostky(poloha)) {
                return false;
            }
        }
        return true;
    }

    public vratCtverec(poloha: Poloha): Ctverec {
        return this.ctverce.vratCtverec(poloha);
    }

    public pridejDoSpadlychKostek(kostka: Kostka): void {
        this.spadleKostky.pridejKostku(kostka);
    }
    
    public odeberVyplneneRadky(): void {
        this.spadleKostky.odeberVyplneneRadky();
        this.vymazVsechnyCtverce();
        this.vykresliSpadleKostky();
    }

    private jePolohaMimoOblastPole(poloha: Poloha): boolean {
        return (poloha.x < 1 || poloha.x > this.pocetSloupcu || poloha.y > this.pocetRadku);
    }

    private pridejCtverceDoPole(): void {
        this.ctverce.aplikujFunkciProKazdyCtverec(
            (ctverec: Ctverec) => this.elPole.appendChild(ctverec.vratHTMLElement())
        );
    }

    private vymazVsechnyCtverce(): void {
        this.ctverce.aplikujFunkciProKazdyCtverec(
            (ctverec: Ctverec) => ctverec.vymaz()
        );
    }

    private vykresliSpadleKostky(): void {
        this.spadleKostky.vratSpadleCtverce().forEach(
            (spadlyCtverec) => {
                const ctverec: Ctverec = this.ctverce.vratCtverec(spadlyCtverec.poloha);
                ctverec.vykresli(spadlyCtverec.barva);
            }
        );
    }
}