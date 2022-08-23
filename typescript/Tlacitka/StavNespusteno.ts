import { Stav } from "./Stav.js";

export class StavNespusteno extends Stav {

    public prepnout(): void {
        console.log("přepnout nespuštěno");
        this.odeberTlacitkuVsechnyFunkce(this.tlacitkoStart);
        this.odeberTlacitkuVsechnyFunkce(this.tlacitkoStop);
        this.priradTlacitkuFunkci(this.tlacitkoStart, this.spustHru.bind(this), "Spustit");
    }

    protected spustHru(): void {
        this.hra.spust.bind(this.hra);
        console.log(this.stavy["spusteno"]);
        this.stavy["spusteno"]?.prepnout();
    }
}