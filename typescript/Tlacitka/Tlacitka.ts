import { Hra } from "../Hra.js";

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
    }

    public aktivuj(): void {
        this.tlacitkoStart.addEventListener("click", this.start.bind(this));
        this.tlacitkoStop.addEventListener("click", this.stop.bind(this));
    }

    private start(): void {
        if (!this.hra.jeSpustena) {
            this.hra.spust();
        }
    }

    private stop(): void {
        if (this.hra.jeSpustena) {
            this.hra.ukonci();
        }
    }
}