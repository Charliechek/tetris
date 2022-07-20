import { Tvar } from "./Tvar.js";

export class Konfigurace {

    private readonly souborTvaru: string = "./tvary.json";
    private readonly souborBarev: string = "./barvy.json";
    private tvary: boolean[][][] | undefined;
    private barvy: string[] | undefined;
    
    public async nactiKonfiguraci() {
        this.tvary = await this.nactiSoubor(this.souborTvaru);
        this.barvy = await this.nactiSoubor(this.souborBarev);
    }
    
    private async nactiSoubor(soubor: string): Promise<any[]> {
        return await new Promise((resolve, reject) => {
            const XHR: XMLHttpRequest = new XMLHttpRequest();
            XHR.onload = () => {
                if (XHR.status !== 200) {
                    reject("Soubor " + soubor + " nebylo možné načíst.");
                }
                try {
                    const vysledek = JSON.parse(XHR.response);
                    resolve(vysledek);
                } catch(e) {
                    reject("Data v souboru " + soubor + " nemají platný json formát.");
                }
            };
            XHR.open("GET", soubor);
            XHR.send();
        });
    }
    
    public vratNahodnyTvar(): Tvar {
        if (this.tvary === undefined) {
            throw new Error("Tvary nebyly řádně načteny.");
        }
        const nahodnyIndexTvaru: number = Math.floor(Math.random() * this.tvary.length);
        return new Tvar(this.tvary[nahodnyIndexTvaru]);
    }
        
    public vratNahodnouBarvu(): string {
        if (this.barvy === undefined) {
            throw new Error("Barvy nebyly řádně načteny.");
        }
        const nahodnyIndexBarvy: number = Math.floor(Math.random() * this.barvy.length);
        return this.barvy[nahodnyIndexBarvy];
    }
}