export class Ctverec {

    private readonly sirkaCary: string = "1px";
    private readonly stylCary: string = "solid";
    private readonly vzorek: string;
    private readonly element: HTMLDivElement;

    constructor(element: HTMLDivElement, barva: string = "black") {
        this.element = element;
        this.vzorek = "linear-gradient(315deg, " + barva + ", white)";
    }

    public vratHTMLElement(): HTMLDivElement {
        return this.element;
    }

    public vykresli(): void {
        this.element.style.backgroundImage = this.vzorek;
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