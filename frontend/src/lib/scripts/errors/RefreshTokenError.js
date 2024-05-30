export class RefreshTokenError extends Error {
    constructor() {
        super("Authorized request error! Try reload page!");
        this.name = "RefreshTokenError";
    }
}
