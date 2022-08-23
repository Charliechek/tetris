export class Titulky {

    private elTitulky: HTMLDivElement;
    private vyska: number;
    private sirka: number;

    constructor(pocetRadku: number, pocetSloupcu: number, pxVelikostCtverce: number) {
        this.elTitulky = document.createElement("div");
        this.vyska = (pxVelikostCtverce + 2) * pocetRadku;
        this.sirka = (pxVelikostCtverce + 2) * pocetSloupcu;
        this.nastavRozmeryAPoziciElementu();
    }
    
    private nastavRozmeryAPoziciElementu(): void {        
        this.elTitulky.style.width =  this.sirka + "px";
        this.elTitulky.style.height = this.vyska + "px";
        this.elTitulky.style.margin = "auto";
        this.elTitulky.style.position = "absolute";
    }
    
    public vlozTitulkyDoPole(elPole: HTMLDivElement): void {
        elPole.appendChild(this.elTitulky);
    }
    
    public spustZaver(): void {
        const elText = document.createElement("div");
        elText.style.paddingTop = (this.vyska / 2) + "px";
        elText.style.textAlign = "center";
        elText.style.fontSize = "24pt";
        elText.style.fontWeight = "bold";
        elText.style.fontFamily = "Tahoma";
        elText.style.color = "white";
        elText.innerHTML = "KONEC";
        this.elTitulky.appendChild(elText);
    }

    public vymaz(): void {
        this.elTitulky.innerHTML = "";
    }
}