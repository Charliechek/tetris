import { Kostka } from "./Kostka.js";

export class Klavesnice {

    private kostka: Kostka | undefined;

    public priradKostku(kostka: Kostka) {
        this.kostka = kostka;
    }

    public aktivuj(): void {
        window.addEventListener("keydown", this.poslouchejKlavesnici.bind(this));
    }

    public deaktivuj(): void {
        window.removeEventListener("keydown", this.poslouchejKlavesnici.bind(this));
    }

    private poslouchejKlavesnici(e: KeyboardEvent): void {
        e.preventDefault();
        switch (e.code) {
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