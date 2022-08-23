import { Hra } from "../Hra.js";
import { Stavy } from "./Stavy.js";

export class Tlacitka {

    private hra: Hra;
    private tlacitkoStart: Element;
    private tlacitkoStop: Element;

    public constructor(hra: Hra, selektorTlacitkoStart: string, selektorTlacitkoStop: string) {
        this.hra = hra;
        const tlacitkoStart = document.querySelector(selektorTlacitkoStart);
        const tlacitkoStop = document.querySelector(selektorTlacitkoStop);
        if (tlacitkoStart === null || tlacitkoStop === null) {
            throw new Error("Jedno nebo více tlačítek nebylo nalezeno.");
        }
        this.tlacitkoStart = tlacitkoStart;
        this.tlacitkoStop = tlacitkoStop;
        const stavy = new Stavy(this.tlacitkoStart, this.tlacitkoStop, this.hra);
    }
}