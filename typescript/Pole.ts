import { Ctverce } from "./Ctverce.js";
import { Ctverec } from "./Ctverec.js";
import { Kostka } from "./Kostka.js";
import { Poloha } from "./Poloha.js";
import { SpadleKostky } from "./SpadleKostky.js";
import { Titulky } from "./Titulky.js";

export class Pole {

    private readonly pocetSloupcu: number = 9;
    private readonly pocetRadku: number = 20;
    private readonly pxVelikostCtverce: number = 20;
    private ctverce: Ctverce;
    private spadleKostky: SpadleKostky;
    private titulky: Titulky;

    constructor(selektorPole: string) {
        const elPole: HTMLDivElement | null = document.querySelector(selektorPole);
        if (elPole === null) {
            throw new Error("Element pole nebyl nalezen.");
        }
        this.ctverce = new Ctverce(this.pxVelikostCtverce, this.pocetRadku, this.pocetSloupcu, elPole);
        this.spadleKostky = new SpadleKostky(this.pocetSloupcu);
        this.titulky = new Titulky(this.pxVelikostCtverce, this.pocetRadku, this.pocetSloupcu, elPole);
    }
    
    public vymazPole(): void {
        this.spadleKostky.vymazVse();
        this.ctverce.vymazVsechnyCtverce();
        this.titulky.vymaz();
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
        this.ctverce.vymazVsechnyCtverce();
        this.vykresliSpadleKostky();
    }

    private jePolohaMimoOblastPole(poloha: Poloha): boolean {
        return (poloha.x < 1 || poloha.x > this.pocetSloupcu || poloha.y > this.pocetRadku);
    }

    private vykresliSpadleKostky(): void {
        this.spadleKostky.vratSpadleCtverce().forEach(
            (spadlyCtverec) => {
                const ctverec: Ctverec = this.ctverce.vratCtverec(spadlyCtverec.poloha);
                ctverec.vykresli(spadlyCtverec.barva);
            }
        );
    }

    public async spustZaverecneTitulky(): Promise<void> {
        await this.titulky.spustZaver();
    }

    public async spustUvodniTitulky(): Promise<void> {
        await this.titulky.spustUvod();
        this.titulky.vymaz();
    }
}