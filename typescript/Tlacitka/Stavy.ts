import { Hra } from "../Hra.js";
import { Stav } from "./Stav.js";
import { StavNespusteno } from "./StavNespusteno.js";
import { StavSpusteno } from "./StavSpusteno.js";

export class Stavy {

    private stavy: any = [];

    public constructor(tlacitkoStart: Element, tlacitkoStop: Element, hra: Hra) {
        this.vytvorStavy(tlacitkoStart, tlacitkoStop, hra);
        this.stavy["nespusteno"].prepnout();
    }

    private vytvorStavy(tlacitkoStart: Element, tlacitkoStop: Element, hra: Hra): void {
        const stavSpusteno: Stav = new StavSpusteno(tlacitkoStart, tlacitkoStop, hra, this.stavy);
        this.stavy["spusteno"] = stavSpusteno;
        const stavNespusteno: Stav = new StavNespusteno(tlacitkoStart, tlacitkoStop, hra, this.stavy);
        this.stavy["nespusteno"] = stavNespusteno;
    }
}