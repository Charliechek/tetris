export class Titulky {

    private elTitulky: HTMLDivElement;
    private vyska: number;
    private sirka: number;

    constructor(pxVelikostCtverce: number, pocetRadku: number, pocetSloupcu: number, elPole: HTMLDivElement) {
        this.elTitulky = document.createElement("div");
        this.vyska = (pxVelikostCtverce + 2) * pocetRadku;
        this.sirka = (pxVelikostCtverce + 2) * pocetSloupcu;
        this.nastavRozmeryAPoziciElementu();
        this.nastavVychoziFormatTextu();
        elPole.appendChild(this.elTitulky);
    }
    
    private nastavRozmeryAPoziciElementu(): void {        
        this.elTitulky.style.width =  this.sirka + "px";
        this.elTitulky.style.height = this.vyska + "px";
        this.elTitulky.style.margin = "auto";
        this.elTitulky.style.position = "absolute";
    }
    
    private nastavVychoziFormatTextu(): void {
        this.elTitulky.style.textAlign = "center";
        this.elTitulky.style.fontWeight = "bold";
        this.elTitulky.style.fontFamily = "Tahoma";
        this.elTitulky.style.color = "white";
    }
    
    public async spustZaver(): Promise<void> {
        const elText = document.createElement("div");
        this.elTitulky.appendChild(elText);
        elText.style.paddingTop = (this.vyska / 2) + "px";
        elText.innerHTML = "KONEC";
        await this.zvetsujPismoElementu(elText);
    }

    public async spustUvod(): Promise<void> {
        const elText1 = document.createElement("div");
        const elText2 = document.createElement("div");
        elText1.style.paddingTop = (this.vyska / 3) + "px";
        elText2.style.paddingTop = (this.vyska / 5)  + "px";
        elText1.innerHTML = "TETRIS";
        elText2.innerHTML = "Karel Kohout";
        this.elTitulky.appendChild(elText1);
        await this.zvetsujPismoElementu(elText1);
        this.elTitulky.appendChild(elText2);
        await this.zvetsujPismoElementu(elText2, 1, 20, 2000);
    }    

    private async zvetsujPismoElementu(
        element: HTMLDivElement, 
        pocatecniVelikost: number = 1, 
        konecnaVelikost: number = 30,
        zastavitNaMs: number = 0
    ): Promise<void> {
        let velikostPisma = pocatecniVelikost;
        return await new Promise((konec) => {
            function zvetsiPismo() {
                element.style.fontSize = velikostPisma++ + "pt";
                if (velikostPisma < konecnaVelikost) {
                    setTimeout(zvetsiPismo, 100);
                } else {
                    setTimeout(() => konec(), zastavitNaMs);
                }
            }
            zvetsiPismo();
        });
    }

    public vymaz(): void {
        this.elTitulky.innerHTML = "";
    }
}