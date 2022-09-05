import { Konfigurace } from "./Konfigurace.js";
import { Kostka } from "./Kostka.js";
import { Pole } from "./Pole.js";
import { Tvar } from "./Tvar.js";

export class GeneratorKostek {

    private tvar: Tvar;
    private barva: string;
    private pole: Pole;
    private konfigurace: Konfigurace;

    public constructor(pole: Pole, konfigurace: Konfigurace) {
        this.pole = pole;
        this.konfigurace = konfigurace;
        this.tvar = this.konfigurace.vratNahodnyTvar();
        this.barva = this.konfigurace.vratNahodnouBarvu();
    }

    public get nasledujiciTvar(): Tvar {
        return this.tvar;
    }

    public get nasledujiciBarva(): string {
        return this.barva;
    }

    public vratDalsiKostku(): Kostka {
        const kostka: Kostka = new Kostka(this.pole, this.tvar, this.barva);
        this.tvar = this.konfigurace.vratNahodnyTvar();
        this.barva = this.konfigurace.vratNahodnouBarvu();
        return kostka;
    }
}