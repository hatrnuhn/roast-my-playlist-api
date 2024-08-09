import { TSchema } from "@sinclair/typebox"
import { ValueErrorType } from "@sinclair/typebox/build/cjs/errors"

class GeneralError extends Error {
    private statusCode: number

    constructor(code: number, message: string) {
        super(message),
        this.statusCode = code
    }

    public get code() {
        return this.statusCode
    }
}

export class CORSError extends GeneralError {
    constructor(message: string) {
        super(403, message)
    }
}

export class ValidationError extends GeneralError {
    private errorType: ValueErrorType
    private onSchema: TSchema

    constructor(message: string, type: ValueErrorType, schema: TSchema) {
        super(400, message)
        this.errorType = type
        this.onSchema = schema
    }

    public get type() {
        return this.errorType
    }

    public get schema() {
        return this.onSchema
    }
}