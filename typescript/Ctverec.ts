export class Ctverec {

    private readonly sirkaCary: string = "1px";
    private readonly stylCary: string = "solid";
    private readonly element: HTMLDivElement;

    constructor(element: HTMLDivElement) {
        this.element = element;
        this.vymaz();
    }

    public pridejDoPole(elementPole: HTMLDivElement): void {
        elementPole.appendChild(this.element);
    }

    public vykresli(barva: string = "black"): void {
        this.element.style.backgroundImage = "linear-gradient(315deg, " + barva + ", white)";
        this.element.style.borderColor = "RGBA(0, 0, 0, 0.7)";
        this.element.style.borderStyle = this.stylCary;
        this.element.style.borderWidth = this.sirkaCary;
    }

    public vymaz(): void {
        this.element.style.backgroundImage = "none";
        this.element.style.borderColor = "RGBA(0, 0, 0, 0)";
        this.element.style.borderStyle = this.stylCary;
        this.element.style.borderWidth = this.sirkaCary;
    }
}