export class UpdateError extends Error {
    constructor() {
        const message = "Error accurred while updating!";
        super(message);
        this.name = "UpdateError";
    }
}
