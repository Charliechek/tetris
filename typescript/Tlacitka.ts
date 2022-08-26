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
        this.priradFunkciTlacitkuStart(this.pauza.bind(this), "Pauza");
    }

    private stop(): void {
        this.hra.ukonci();
        this.priradFunkciTlacitkuStart(this.start.bind(this), "Start");
    }

    private pauza(): void {
        this.hra.prerus();
        this.priradFunkciTlacitkuStart(this.pokracovani.bind(this), "Pokračovat");
    }

    private pokracovani(): void {
        this.hra.obnov();
        this.priradFunkciTlacitkuStart(this.pauza.bind(this), "Pauza");
    }

    private priradFunkciTlacitkuStart(funkce: EventListener, nazevTlacitka: string = "Start"): void {
        this.tlacitkoStart.innerHTML = nazevTlacitka;
        this.odeberPosluchaceUdalostiTlacitkaStart();
        this.tlacitkoStart.addEventListener("click", funkce);
    }

    private odeberPosluchaceUdalostiTlacitkaStart(): void {
        const novyElement = this.tlacitkoStart.cloneNode(true);
        this.tlacitkoStart.parentNode?.replaceChild(novyElement, this.tlacitkoStart);
        this.tlacitkoStart = document.querySelector(this.selektorTlacitkoStart) ?? this.tlacitkoStart;
    }
}