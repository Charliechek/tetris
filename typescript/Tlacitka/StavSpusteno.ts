import { Stav } from "./Stav.js";

export class StavSpusteno extends Stav {

    public prepnout(): void {
        this.odeberTlacitkuVsechnyFunkce(this.tlacitkoStart);
        this.odeberTlacitkuVsechnyFunkce(this.tlacitkoStop);
        this.priradTlacitkuFunkci(this.tlacitkoStop, this.ukonciHru, "Ukončit");
    }

    protected ukonciHru(): void {
        this.hra.ukonciHru.bind(this.hra);
        this.stavy["nespusteno"]?.prepnout();
    }
}