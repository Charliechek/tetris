import { Ctverec } from "./Ctverec.js";
import { GeneratorKostek } from "./GeneratorKostek.js";

export class UkazkaKostky {

    private elNasledujiciKostka: Element;
    private generatorKostek: GeneratorKostek;

    public constructor(selektor: string, generatorKostek: GeneratorKostek) {
        const elNasledujiciKostka = document.querySelector(selektor);
        if (elNasledujiciKostka === null) {
            throw new Error("Element pro zobrazení následující kostky nebyl nalezen.");
        }
        this.elNasledujiciKostka = elNasledujiciKostka;
        this.generatorKostek = generatorKostek;
    }

    public aktualizuj(): void {
        this.elNasledujiciKostka.innerHTML = "";
        this.vytvorCtverce();
    }

    private vytvorCtverce(): void {
        const matice: boolean[][] = this.generatorKostek.nasledujiciTvar.matice;
        for (let radek of matice) {
            for (let i: number = 0; i < radek.length; i++) {
                const jeVybarveny = radek[i];
                const jePosledniVRadku = (i === 0);
                const ctverec: Ctverec = this.vytvorCtverec(jeVybarveny, jePosledniVRadku);
            }
        }
    }
    
    private vytvorCtverec(jeVybarveny: boolean, jePosledniVRadku: boolean): Ctverec {   
        const elCtverec: HTMLDivElement = this.vytvorElementCtverce(jePosledniVRadku);     
        const ctverec: Ctverec = new Ctverec(elCtverec);
        if (jeVybarveny) {
            ctverec.vykresli(this.generatorKostek.nasledujiciBarva);
        } else {
            ctverec.vymaz();
        }
        return ctverec;
    }
    
    private vytvorElementCtverce(jePosledniVRadku: boolean): HTMLDivElement {
        const elCtverec: HTMLDivElement = document.createElement("div");
        elCtverec.style.width = "10px";
        elCtverec.style.height = "10px";
        elCtverec.style.display = "inline-block";
        elCtverec.style.float = "left";
        if (jePosledniVRadku) {
            elCtverec.style.clear = "left";
        }
        this.elNasledujiciKostka.appendChild(elCtverec);
        return elCtverec;
    }
}