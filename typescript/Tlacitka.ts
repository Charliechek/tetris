import { Hra } from "./Hra.js";

export class Tlacitka {

    private hra: Hra;
    private tlacitkoStart: Element;
    private tlacitkoStop: Element;
    private selektorTlacitkoStart: string;
    private selektorTlacitkoStop: string;

    public constructor(hra: Hra, selektorTlacitkoStart: string, selektorTlacitkoStop: string) {
        this.hra = hra;
        this.selektorTlacitkoStart = selektorTlacitkoStart;
        this.selektorTlacitkoStop = selektorTlacitkoStop;
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
        this.hra.spust();
        this.tlacitkoStart.innerHTML = "Pauza";
        this.odeberPosluchaceUdalostiTlacitkaStart();
        this.tlacitkoStart.addEventListener("click", this.pauza.bind(this));
    }

    private stop(): void {
        this.hra.ukonci();
        this.tlacitkoStart.innerHTML = "Start";
        this.odeberPosluchaceUdalostiTlacitkaStart();
        this.tlacitkoStart.addEventListener("click", this.start.bind(this));
    }

    private pauza(): void {
        this.hra.prerus();
        this.tlacitkoStart.innerHTML = "Pokračovat";
        this.odeberPosluchaceUdalostiTlacitkaStart();
        this.tlacitkoStart.addEventListener("click", this.pokracovani.bind(this));
    }

    private pokracovani(): void {
        this.hra.obnov();
        this.tlacitkoStart.innerHTML = "Pauza";
        this.odeberPosluchaceUdalostiTlacitkaStart();
        this.tlacitkoStart.addEventListener("click", this.pauza.bind(this));
    }

    private odeberPosluchaceUdalostiTlacitkaStart(): void {
        const novyElement = this.tlacitkoStart.cloneNode(true);
        this.tlacitkoStart.parentNode?.replaceChild(novyElement, this.tlacitkoStart);
        this.tlacitkoStart = document.querySelector(this.selektorTlacitkoStart) ?? this.tlacitkoStart;
    }
}