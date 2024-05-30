export class DeleteError extends Error {
    constructor() {
        const message = "Error accurred while deleting!";
        super(message);
        this.name = "DeleteError";
    }
}
