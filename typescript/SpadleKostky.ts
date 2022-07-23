import { Kostka } from "./Kostka.js";
import { Poloha } from "./Poloha.js";
import { SpadlyCtverec } from "./SpadlyCtverec.js";

export class SpadleKostky {

    private spadleCtverce: SpadlyCtverec[] = [];
    private pocetSloupcu: number;

    constructor(pocetSloupcu: number) {
        this.pocetSloupcu = pocetSloupcu;
    }

    public pridejKostku(kostka: Kostka): void {
        const barva: string = kostka.barva;
        kostka.vratPolohyCtvercu().forEach((poloha) => {
            this.spadleCtverce.push(new SpadlyCtverec(poloha, barva));
        });
    }

    public jePolohaCtverceSpadleKostky(poloha: Poloha): boolean {
        for (let polohaCtverceSpadleKostky of this.spadleCtverce) {
            if (poloha.x === polohaCtverceSpadleKostky.poloha.x && poloha.y === polohaCtverceSpadleKostky.poloha.y) {
                return true;
            }
        }
        return false;
    }

    public odeberVyplneneRadky(): void {
        const cislaVyplnenychRadku: number[] = this.zjistiCislaVyplnenychRadku();
        for (let cisloVyplnenehoRadku of cislaVyplnenychRadku) {
            this.odeberRadek(cisloVyplnenehoRadku);
        }
    }

    public vratSpadleCtverce(): SpadlyCtverec[] {
        return this.spadleCtverce;
    }
    
    private odeberRadek(cisloRadku: number): void {
        const noveSpadleCtverce: SpadlyCtverec[] = [];      
        for (let spadlyCtverec of this.spadleCtverce) {
            if (spadlyCtverec.poloha.y > cisloRadku) {
                noveSpadleCtverce.push(spadlyCtverec);
            }
            if (spadlyCtverec.poloha.y < cisloRadku) {
                const novaPoloha: Poloha = new Poloha(spadlyCtverec.poloha.x, spadlyCtverec.poloha.y + 1);
                const novySpadlyCtverec: SpadlyCtverec = new SpadlyCtverec(novaPoloha, spadlyCtverec.barva);
                noveSpadleCtverce.push(novySpadlyCtverec);
            }
        }
        this.spadleCtverce = noveSpadleCtverce;
    }
    
    private zjistiCislaVyplnenychRadku(): number[] {        
        const cislaVyplnenychRadku: number[] = [];
        this.zjistiPoctyCtvercuVRadcich().forEach((pocetCtvercu, cisloRadku) => {
            if (pocetCtvercu === this.pocetSloupcu) {
                cislaVyplnenychRadku.push(cisloRadku);
            }
        });
        return cislaVyplnenychRadku;
    }
    
    private zjistiPoctyCtvercuVRadcich(): number[] {
        const poctyCtvercuVRadcich: number[] = [];
        for (let ctverec of this.spadleCtverce) {
            const radek: number = ctverec.poloha.y;
            if (poctyCtvercuVRadcich[radek] === undefined) {
                poctyCtvercuVRadcich[radek] = 0;
            }
            poctyCtvercuVRadcich[radek]++;
        }
        return poctyCtvercuVRadcich;
    }
}