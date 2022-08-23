import { Hra } from "../Hra.js";

export abstract class Stav {

    protected tlacitkoStart: Element;
    protected tlacitkoStop: Element;
    protected hra: Hra;
    protected stavy;

    public constructor(tlacitkoStart: Element, tlacitkoStop: Element, hra: Hra, stavy: any) {
        this.tlacitkoStart = tlacitkoStart;
        this.tlacitkoStop = tlacitkoStop;
        this.hra = hra;
        this.stavy = stavy;
    }

    public abstract prepnout(): void;

    protected priradTlacitkuFunkci(tlacitko: Element, funkce: EventListener, nazevTlacitka: string = ""): void {
        tlacitko.addEventListener("click", funkce);
        if (nazevTlacitka !== "") {
            console.log(tlacitko);
            tlacitko.innerHTML = nazevTlacitka;
        }
    }

    protected odeberTlacitkuVsechnyFunkce(tlacitko: Element): void {
        const noveTlacitko = tlacitko.cloneNode(true);
        tlacitko.parentNode?.replaceChild(noveTlacitko, tlacitko);
    }
}