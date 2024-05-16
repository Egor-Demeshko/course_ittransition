export class RefreshTokenError extends Error {
    constructor() {
        super("Error during refreshing token request!");
    }
}
