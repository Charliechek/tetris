import { Ctverec } from "./Ctverec.js";
import { Poloha } from "./Poloha.js";

export class Ctverce {

    private readonly pxVelikostCtverce: number;

    private ctverce: Ctverec[][] = [];

    public constructor(
        pxVelikostCtverce: number, 
        pocetRadku: number, 
        pocetSloupcu: number, 
        elPole: HTMLDivElement
    ) {
        this.pxVelikostCtverce = pxVelikostCtverce;
        this.vytvorCtverce(pocetRadku, pocetSloupcu);
        this.vlozCtverceDoPole(elPole);
    }

    public aplikujFunkciProKazdyCtverec(funkce: CallableFunction): void {
        this.ctverce.forEach((radek) => radek.forEach((ctverec) => funkce(ctverec)));
    }

    public vymazVsechnyCtverce(): void {
        this.aplikujFunkciProKazdyCtverec(
            (ctverec: Ctverec) => ctverec.vymaz()
        );
    }

    public vratCtverec(poloha: Poloha): Ctverec {
        const ctverec = this.ctverce[poloha.y]?.[poloha.x];
        if (ctverec === undefined) {
            throw new Error("Tento čtverec neexistuje.");
        }
        return ctverec;
    }

    private vlozCtverceDoPole(elPole: HTMLDivElement): void {
        this.aplikujFunkciProKazdyCtverec(
            (ctverec: Ctverec) => ctverec.pridejDoPole(elPole)
        );
    }
    
    private vytvorCtverce(pocetRadku: number, pocetSloupcu: number): void {
        for (let y: number = 1; y <= pocetRadku; y++) {
            for (let x: number = 1; x <= pocetSloupcu; x++) {
                const ctverec: Ctverec = this.vytvorCtverec(x);   
                if (this.ctverce[y] === undefined) {
                    this.ctverce[y] = [];
                }             
                this.ctverce[y][x] = ctverec;
            }
        }
    }

    private vytvorCtverec(x: number): Ctverec {
        const element = document.createElement("div");
        element.style.width = this.pxVelikostCtverce + "px";
        element.style.height = this.pxVelikostCtverce + "px";
        element.style.display = "inline-block";
        element.style.float = "left";
        if (x === 1) {
            element.style.clear = "left";
        }
        return new Ctverec(element);
    }
}