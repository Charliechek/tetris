import { Klavesnice } from "./Klavesnice.js";
import { Kostka } from "./Kostka.js";
import { Pole } from "./Pole.js";
import { Tvar } from "./Tvar.js";
import { Konfigurace } from "./Konfigurace.js";
import { Stopky } from "./Stopky.js";

export class Hra {

    private jeSpustena: boolean;
    private jePrerusena: boolean;
    private pole: Pole;
    private klavesnice: Klavesnice;
    private kostka: Kostka | undefined;
    private konfigurace: Konfigurace;
    private stopky: Stopky;
    private interval: number | undefined;

    constructor(selektorPole: string, stopky: Stopky, konfigurace: Konfigurace) {
        this.pole = new Pole(selektorPole);
        this.stopky = stopky;
        this.konfigurace = konfigurace;
        this.klavesnice = new Klavesnice();
        this.jeSpustena = false;
        this.jePrerusena = false;
    }
    
    public spust(): void {
        if (this.jeSpustena) {
            throw new Error("Hra je již spuštěna.");
        }
        this.pole.vymazPole();
        this.klavesnice.aktivuj();
        this.stopky.vynuluj();
        this.stopky.spust();
        this.vytvorNovouKostku();
        this.spustPadaniKostky();
        this.jeSpustena = true;
        this.jePrerusena = false;
    }
    
    public ukonci(): void {
        if (!this.jeSpustena) {
            throw new Error("Hra není spuštěna.");
        }
        this.klavesnice.deaktivuj();
        this.stopky.zastav();
        this.ukonciPadaniKostky();
        this.pole.spustZaverecneTitulky();
        this.jeSpustena = false;
        this.jePrerusena = false;
    }

    public prerus(): void {
        if (!this.jeSpustena || this.jePrerusena) {
            throw new Error("Hra už je přerušena nebo vůbec nebyla spuštěna.");
        }
        this.klavesnice.deaktivuj();
        this.stopky.zastav();
        this.ukonciPadaniKostky();
        this.jePrerusena = true;
    }

    public obnov(): void {
        if (!this.jeSpustena || !this.jePrerusena) {
            throw new Error("Hra není přerušena nebo vůbec nebyla spuštěna.");
        }
        this.klavesnice.aktivuj();
        this.stopky.spust();
        this.spustPadaniKostky();
        this.jePrerusena = false;
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