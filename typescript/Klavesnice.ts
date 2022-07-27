import { Kostka } from "./Kostka.js";

export class Klavesnice {

    private kostka: Kostka | undefined;
    private posluchacKlavesnice: (event: KeyboardEvent) => void;

    public constructor() {
        this.posluchacKlavesnice = this.poslouchejKlavesnici.bind(this);
    }

    public priradKostku(kostka: Kostka) {
        this.kostka = kostka;
    }

    public aktivuj(): void {
        window.addEventListener("keydown", this.posluchacKlavesnice);
    }

    public deaktivuj(): void {
        window.removeEventListener("keydown", this.posluchacKlavesnice);
    }

    private poslouchejKlavesnici(event: KeyboardEvent): void {
        event.preventDefault();
        try {
            this.vyhodnotKlavesu(event.code);
        } catch (chyba) {
            console.log(chyba);
        }
    }
    
    private vyhodnotKlavesu(klavesa: string): void {
        switch (klavesa) {
            case "ArrowLeft":
                this.kostka?.posunVlevo();
                break;
            case "ArrowRight":
                this.kostka?.posunVpravo();
                break;
            case "ArrowDown":
                this.kostka?.posunDolu();
                break;
            case "Space":
                this.kostka?.otoc();
                break;
        }
    }
}