export default class ApiError {
    code: number;
    message: string
    constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }
    static missingJWTKey() {
        throw new Error('Missing JWT Key')
    }
}