import { Hra } from "./Hra.js";
import { Konfigurace } from "./Konfigurace.js";
import { Tlacitka } from "./Tlacitka.js";

const selektorPole: string = "#pole";
const selektorTlacitkoStart: string = "#tlacitko_start";
const selektorTlacitkoStop: string = "#tlacitko_stop";
const selektorStopky: string = "#stopky";

const konfigurace: Konfigurace = new Konfigurace();
await konfigurace.nactiKonfiguraci().catch((duvod) => {
    console.log(duvod);
});

const hra: Hra = new Hra(selektorPole, selektorStopky, konfigurace);

const tlacitka: Tlacitka = new Tlacitka(hra, selektorTlacitkoStart, selektorTlacitkoStop);
tlacitka.aktivuj();



