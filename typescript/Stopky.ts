export class Stopky {

    private elStopky: Element;
    private casZacatku: Date | undefined;
    private uplynulyCasPredPauzou: Date | undefined;
    private interval: number | undefined;

    constructor(selektorStopky: string) {
        const elStopky = document.querySelector(selektorStopky);
        if (elStopky === null) {
            throw new Error("Element stopek nebyl nalezen.");
        }
        this.elStopky = elStopky;
        this.aktualizuj();
    }

    public spust(): void {
        if (this.casZacatku !== undefined) {
            throw new Error("Stopky nelze spustit, protože už jsou spustěny.");
        }
        this.casZacatku = new Date();
        this.interval = setInterval(this.aktualizuj.bind(this), 100);
    }

    public zastav(): void {
        this.uplynulyCasPredPauzou = this.vratCelkovyUplynulyCas();
        this.casZacatku = undefined;
        clearInterval(this.interval);
    }

    public vynuluj(): void {
        this.casZacatku = undefined;
        this.uplynulyCasPredPauzou = undefined;
    }

    private aktualizuj(): void {
        const uplynulyCas = this.vratCelkovyUplynulyCas();
        this.elStopky.innerHTML = uplynulyCas.toISOString().substring(11, 22);
    }

    private vratCelkovyUplynulyCas(): Date {
        const casZacatku = this.casZacatku?.getTime();
        if (casZacatku === undefined) {
            return new Date(0);
        }
        const casAktualni = (new Date()).getTime();
        const uplynulyCasPredPauzou = this.uplynulyCasPredPauzou?.getTime() ?? 0;
        return new Date((casAktualni - casZacatku) + uplynulyCasPredPauzou);
    }
}