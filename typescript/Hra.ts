import { Klavesnice } from "./Klavesnice.js";
import { Kostka } from "./Kostka.js";
import { Pole } from "./Pole.js";

export class Hra{

    private pole: Pole;
    private klavesnice: Klavesnice;
    private kostka: Kostka | undefined;

    constructor(selektorPole: string) {
        this.pole = new Pole(selektorPole);
        this.pole.vytvorPole();
        this.klavesnice = new Klavesnice();
        this.klavesnice.aktivuj();
    }
    
    public spust(): void {
        this.vytvorNovouKostku();
        this.spustPadaniKostky();
    }

    private spustPadaniKostky(): void {
        this.spadni();
    }

    private vytvorNovouKostku(): void {
        this.kostka = new Kostka(this.pole);
        this.klavesnice.priradKostku(this.kostka);
    }

    private spadni(): void {
        if (this.kostka === undefined) {
            throw new Error("Neexistuje kostka, která by mohla padat.");
        }
        const posunulaSeKostkaDolu: boolean = this.kostka.posunDolu();
        if (!posunulaSeKostkaDolu) {
            this.pole.pridejDoSpadlychKostek(this.kostka);
            this.vytvorNovouKostku();
        }
        setTimeout(this.spadni.bind(this), 1000);
    }
}