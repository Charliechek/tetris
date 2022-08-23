import { Klavesnice } from "./Klavesnice.js";
import { Kostka } from "./Kostka.js";
import { Pole } from "./Pole.js";
import { Tvar } from "./Tvar.js";
import { Konfigurace } from "./Konfigurace.js";

export class Hra {

    private jeHraSpustena: boolean;
    private pole: Pole;
    private klavesnice: Klavesnice;
    private kostka: Kostka | undefined;
    private konfigurace: Konfigurace;
    private interval: number | undefined;

    constructor(selektorPole: string, konfigurace: Konfigurace) {
        this.pole = new Pole(selektorPole);
        this.pole.vytvorPole();
        this.klavesnice = new Klavesnice();
        this.konfigurace = konfigurace;
        this.jeHraSpustena = false;
    }

    public get jeSpustena(): boolean {
        return this.jeHraSpustena;
    }
    
    public spust(): void {
        this.pole.vymazPole();
        this.klavesnice.aktivuj();
        this.vytvorNovouKostku();
        this.spustPadaniKostky();
        this.jeHraSpustena = true;
    }
    
    public ukonci(): void {
        this.klavesnice.deaktivuj();
        this.pole.spustZaverecneTitulky();
        this.ukonciPadaniKostky();
        this.jeHraSpustena = false;
    }

    private spustPadaniKostky(): void {
        this.interval = setInterval(this.posunKostkuDolu.bind(this), 1000);
    }

    private ukonciPadaniKostky(): void {
        clearInterval(this.interval);
    }

    private vytvorNovouKostku(): void {
        const tvar: Tvar = this.konfigurace.vratNahodnyTvar();
        const barva: string = this.konfigurace.vratNahodnouBarvu();
        this.kostka = new Kostka(this.pole, tvar, barva);
        try {
            this.kostka.vykresliVAktualniPoloze();
        } catch (e) {
            this.ukonci();
        }
        this.klavesnice.priradKostku(this.kostka);
    }
    
    private posunKostkuDolu(): void {
        if (this.kostka === undefined) {
            throw new Error("Neexistuje kostka, která by mohla padat.");
        }
        try {
            this.kostka.posunDolu();
        } catch (e) {
            this.pole.pridejDoSpadlychKostek(this.kostka);
            this.pole.odeberVyplneneRadky();
            this.vytvorNovouKostku();
        }
    }
}