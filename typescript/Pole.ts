import { Ctverce } from "./Ctverce.js";
import { Ctverec } from "./Ctverec.js";
import { Kostka } from "./Kostka.js";
import { Poloha } from "./Poloha.js";
import { SpadleKostky } from "./SpadleKostky.js";

export class Pole {

    private readonly pocetSloupcu: number = 9;
    private readonly pocetRadku: number = 20;
    private readonly pxVelikostCtverce: number = 20;
    private elPole: HTMLDivElement;
    private ctverce: Ctverce;
    private spadleKostky: SpadleKostky;

    constructor(selektorPole: string) {
        const elPole: HTMLDivElement | null = document.querySelector(selektorPole);
        if (elPole === null) {
            throw new Error("Element pole nebyl nalezen.");
        }
        this.elPole = elPole;
        this.ctverce = new Ctverce(this.pxVelikostCtverce);
        this.spadleKostky = new SpadleKostky(this.pocetSloupcu);
    }
    
    public vytvorPole(): void {
        this.ctverce.vytvorCtverce(this.pocetRadku, this.pocetSloupcu);
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
            (ctverec: Ctverec) => ctverec.pridejDoPole(this.elPole)
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

    public spustZaver(): void {
        const element = document.createElement("div");
        const velikostCtverceSOhranicenim = this.pxVelikostCtverce + 2;
        element.style.width = (velikostCtverceSOhranicenim * this.pocetSloupcu) + "px";
        element.style.height = (velikostCtverceSOhranicenim * this.pocetRadku) + "px";
        element.style.margin = "auto";
        element.style.position = "absolute";
        element.style.paddingTop = "100px";
        element.style.fontSize = "24pt";
        element.style.fontWeight = "bold";
        element.style.textAlign = "center";
        element.style.fontFamily = "Tahoma";
        element.style.color = "white";
        element.innerHTML = "KONEC";
        this.elPole.appendChild(element);
    }
}