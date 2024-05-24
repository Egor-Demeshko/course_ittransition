export class SaveError extends Error {
    constructor() {
        const message = "Save error!";
        super(message);
        this.name = "SaveError";
    }
}
