import { Ctverec } from "./Ctverec.js";
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

    public posunVlevo(): void {
        this.zmenPolohu(-1, 0);
    }

    public posunVpravo(): void {
        this.zmenPolohu(1, 0);
    }

    public posunDolu(): void {
        this.zmenPolohu(0, 1);
    }

    public vykresliVAktualniPoloze(): void {
        this.zmenPolohu(0, 0);
    }

    public otoc(): void {
        const otocenyTvar = this.tvar.vratOtocenyTvar();
        const novePolohyCtvercu: Poloha[] = otocenyTvar.vratPolohyCtvercu(this.poloha);
        if (this.pole.jsouValidniPolohy(novePolohyCtvercu)) {
            this.vykresliOtocenyTvar(otocenyTvar);
        }
    }

    public vratPolohyCtvercu(): Poloha[] {
        return this.tvar.vratPolohyCtvercu(this.poloha);
    }
    
    private zmenPolohu(x: number, y: number): void {
        const novaPoloha: Poloha = new Poloha(
            this.poloha.x + x, 
            this.poloha.y + y
        );
        const novePolohyCtvercu: Poloha[] = this.tvar.vratPolohyCtvercu(novaPoloha);
        if (this.pole.jsouValidniPolohy(novePolohyCtvercu) === false) {
            throw new Error("Kostka narazila na okraj pole nebo jinou kostku.");
        }
        this.vykresliZmenuPolohy(novaPoloha);
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
        this.zmenGrafikuCtvercuKostky((ctverec: Ctverec) => ctverec.vymaz());
    }

    private vykresli(): void {
        this.zmenGrafikuCtvercuKostky((ctverec: Ctverec) => ctverec.vykresli());
    }
    
    private zmenGrafikuCtvercuKostky(funkce: CallableFunction): void {
        try {
            const ctverce: Ctverec[] = this.vratCtverceKostky();
            ctverce.forEach((ctverec) => funkce(ctverec));
        } catch (e) {
            console.log(e);
        }
    }

    private vratCtverceKostky(): Ctverec[] {
        const ctverce: Ctverec[] = [];
        this.tvar.vratPolohyCtvercu(this.poloha).forEach((polohaCtverce) => {
            const ctverec: Ctverec = this.vratCtverecKostky(polohaCtverce);
            ctverce.push(ctverec);
        });
        return ctverce;
    }

    private vratCtverecKostky(polohaCtverce: Poloha): Ctverec {
        const elCtverec: HTMLDivElement | null = document.querySelector(polohaCtverce.idCtverce);
        if (elCtverec === null) {
            throw new Error("Tento čtverec neexistuje.");
        }
        return new Ctverec(elCtverec, this.barva);
    }
}