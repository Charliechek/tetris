import { Hra } from "./Hra.js";
import { Konfigurace } from "./Konfigurace.js";

const selektorPole: string = "#pole";

const konfigurace: Konfigurace = new Konfigurace();
await konfigurace.nactiKonfiguraci().catch((duvod) => {
    console.log(duvod);
});

const hra: Hra = new Hra(selektorPole, konfigurace);
hra.spust();

