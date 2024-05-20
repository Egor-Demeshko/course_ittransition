export class CollectionsGetError extends Error {
    constructor(message) {
        super(message);
        this.name = "CollectionsGetError";
    }
}
