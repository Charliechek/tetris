import { Hra } from "./Hra.js";
import { Konfigurace } from "./Konfigurace.js";
import { Stopky } from "./Stopky.js";
import { Tlacitka } from "./Tlacitka.js";

const selektorPole: string = "#pole";
const selektorTlacitkoStart: string = "#tlacitko_start";
const selektorTlacitkoStop: string = "#tlacitko_stop";
const selektorStopky: string = "#stopky";
const selektorUkazkaKostky: string = "#ukazka_kostky";

try {
    const konfigurace: Konfigurace = new Konfigurace();
    await konfigurace.nactiKonfiguraci();    
    const stopky = new Stopky(selektorStopky);    
    const hra: Hra = new Hra(selektorPole, selektorUkazkaKostky, stopky, konfigurace);    
    const tlacitka: Tlacitka = new Tlacitka(hra, selektorTlacitkoStart, selektorTlacitkoStop);
    tlacitka.aktivuj();
} catch(e) {
    console.log(e);
}



