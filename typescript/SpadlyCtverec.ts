import { Poloha } from "./Poloha.js";

export class SpadlyCtverec {

    public readonly poloha: Poloha;
    public readonly barva: string;

    constructor(poloha: Poloha, barva: string) {
        this.poloha = poloha;
        this.barva = barva;
    }
}