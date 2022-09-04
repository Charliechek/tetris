export class Titulky {

    private elTitulky: HTMLDivElement;
    private vyska: number;
    private sirka: number;

    constructor(pxVelikostCtverce: number, pocetRadku: number, pocetSloupcu: number, elPole: HTMLDivElement) {
        this.elTitulky = document.createElement("div");
        this.vyska = (pxVelikostCtverce + 2) * pocetRadku;
        this.sirka = (pxVelikostCtverce + 2) * pocetSloupcu;
        this.nastavRozmeryAPoziciElementu();
        elPole.appendChild(this.elTitulky);
    }
    
    private nastavRozmeryAPoziciElementu(): void {        
        this.elTitulky.style.width =  this.sirka + "px";
        this.elTitulky.style.height = this.vyska + "px";
        this.elTitulky.style.margin = "auto";
        this.elTitulky.style.position = "absolute";
    }
    
    public async spustZaver(): Promise<void> {
        const elText = document.createElement("div");
        elText.style.paddingTop = (this.vyska / 2) + "px";
        elText.style.textAlign = "center";
        elText.style.fontWeight = "bold";
        elText.style.fontFamily = "Tahoma";
        elText.style.color = "white";
        elText.innerHTML = "KONEC";
        this.elTitulky.appendChild(elText);
        await this.zvetsujPismoElementu(elText);
    }

    public async spustUvod(): Promise<void> {
        const elText = document.createElement("div");
        elText.style.paddingTop = (this.vyska / 2) + "px";
        elText.style.textAlign = "center";
        elText.style.fontWeight = "bold";
        elText.style.fontFamily = "Tahoma";
        elText.style.color = "white";
        elText.innerHTML = "TETRIS";
        this.elTitulky.appendChild(elText);
        await this.zvetsujPismoElementu(elText);
    }    

    private async zvetsujPismoElementu(
        element: HTMLDivElement, 
        pocatecniVelikost: number = 1, 
        konecnaVelikost: number = 30
    ): Promise<void> {
        let velikostPisma = pocatecniVelikost;
        return await new Promise((konec) => {
            function zvetsiPismo() {
                element.style.fontSize = velikostPisma++ + "pt";
                if (velikostPisma < konecnaVelikost) {
                    setTimeout(zvetsiPismo, 100);
                } else {
                    setTimeout(() => konec(), 2000);
                }
            }
            zvetsiPismo();
        });
    }

    public vymaz(): void {
        this.elTitulky.innerHTML = "";
    }
}