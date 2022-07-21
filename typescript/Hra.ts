import { Klavesnice } from "./Klavesnice.js";
import { Kostka } from "./Kostka.js";
import { Pole } from "./Pole.js";
import { Tvar } from "./Tvar.js";
import { Konfigurace } from "./Konfigurace.js";

export class Hra {

    private pole: Pole;
    private klavesnice: Klavesnice;
    private kostka: Kostka | undefined;
    private konfigurace: Konfigurace;

    constructor(selektorPole: string, konfigurace: Konfigurace) {
        this.pole = new Pole(selektorPole);
        this.pole.vytvorPole();
        this.klavesnice = new Klavesnice();
        this.klavesnice.aktivuj();
        this.konfigurace = konfigurace;
    }
    
    public spust(): void {
        this.vytvorNovouKostku();
        this.spustPadaniKostky();
    }

    private spustPadaniKostky(): void {
        this.spadni();
    }

    private vytvorNovouKostku(): void {
        const tvar: Tvar = this.konfigurace.vratNahodnyTvar();
        const barva: string = this.konfigurace.vratNahodnouBarvu();
        this.kostka = new Kostka(this.pole, tvar, barva);
        try {
            this.kostka.vykresliVAktualniPoloze();
        } catch (e) {
            throw new Error("Konec hry.");
        }
        this.klavesnice.priradKostku(this.kostka);
    }

    private spadni(): void {
        if (this.kostka === undefined) {
            throw new Error("Neexistuje kostka, která by mohla padat.");
        }
        try {
            this.kostka.posunDolu();
        } catch (e) {
            this.pole.pridejDoSpadlychKostek(this.kostka);
            this.vytvorNovouKostku();
        }
        setTimeout(this.spadni.bind(this), 1000);
    }
}