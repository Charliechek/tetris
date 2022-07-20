import { Pole } from "./Pole.js";
import { Poloha } from "./Poloha.js";
import { Tvar } from "./Tvar.js";

export class Kostka {

    private poloha: Poloha;
    private pole: Pole;
    private tvar: Tvar;
    private barva: string;

    constructor(pole: Pole, tvar: Tvar, barva: string) {
        this.pole = pole;
        this.tvar = tvar;
        this.barva = barva;
        this.poloha = new Poloha();
    }

    public posunVlevo(): boolean {
        return this.zmenPolohu(-1, 0);
    }

    public posunVpravo(): boolean {
        return this.zmenPolohu(1, 0);
    }

    public posunDolu(): boolean {
        return this.zmenPolohu(0, 1);
    }

    public otoc(): void {
        const otocenyTvar = this.tvar.vratOtocenyTvar();
        const novePolohyCtvercu: Poloha[] = otocenyTvar.vratPolohyCtvercu(this.poloha);
        if (this.pole.jsouValidniPolohy(novePolohyCtvercu)) {
            this.vykresliOtocenyTvar(otocenyTvar);
        }
    }

    public vratIdCtvercuKostky(): string[] {
        const polohyCtvercu = this.tvar.vratPolohyCtvercu(this.poloha);
        const idCtvercu: string[] = [];
        polohyCtvercu.forEach((poloha) => {
            idCtvercu.push(poloha.idCtverce);
        });
        return idCtvercu;
    }
    
    private zmenPolohu(x: number, y: number): boolean {
        const novaPoloha: Poloha = new Poloha(
            this.poloha.x + x, 
            this.poloha.y + y
        );
        const novePolohyCtvercu: Poloha[] = this.tvar.vratPolohyCtvercu(novaPoloha);
        if (!this.pole.jsouValidniPolohy(novePolohyCtvercu)) {
            return false;
        }
        this.vykresliZmenuPolohy(novaPoloha);
        return true;
    }
    
    private vykresliOtocenyTvar(otocenyTvar: Tvar): void {
        this.vymaz();
        this.tvar = otocenyTvar;
        this.vykresli();
    }
    
    private vykresliZmenuPolohy(novaPoloha: Poloha): void {
        this.vymaz();
        this.poloha = novaPoloha;
        this.vykresli();
    }

    private vymaz(): void {
        this.zmenGrafikuCtvercuKostky("RGBA(0, 0, 0, 0)");
    }

    private vykresli(): void {
        this.zmenGrafikuCtvercuKostky(this.barva);
    }
    
    private zmenGrafikuCtvercuKostky(barva: string = "white"): void {
        try {
            const ctverce: HTMLDivElement[] = this.vratCtverceKostky();
            ctverce.forEach((ctverec) => ctverec.style.backgroundColor = barva);
        } catch (e) {
            console.log(e);
        }
    }

    private vratCtverceKostky(): HTMLDivElement[] {
        const ctverce: HTMLDivElement[] = [];
        this.tvar.vratPolohyCtvercu(this.poloha).forEach((polohaCtverce) => {
            const ctverec: HTMLDivElement = this.vratCtverecKostky(polohaCtverce);
            ctverce.push(ctverec);
        });
        return ctverce;
    }

    private vratCtverecKostky(polohaCtverce: Poloha): HTMLDivElement {
        const ctverec: HTMLDivElement|null = document.querySelector(polohaCtverce.idCtverce);
        if (ctverec === null) {
            throw new Error("Tento čtverec neexistuje.");
        }
        return ctverec;
    }
}