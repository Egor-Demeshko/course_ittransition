export class TokenError extends Error {
    constructor() {
        const message = "Token error!";
        super(message);
        this.name = "TokenError";
    }
}
