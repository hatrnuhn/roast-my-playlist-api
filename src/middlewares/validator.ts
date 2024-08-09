import { TypeCompiler } from '@sinclair/typebox/compiler'
import { TSchema } from '@sinclair/typebox'
import { RequestHandler } from 'express'
import { ValidationError } from '../types/errors'

export const validate = (schema: TSchema) => {
    const compiler = TypeCompiler.Compile(schema)

    const validateBody: RequestHandler = (req, res, next) => {
        const result = compiler.Errors(req.body)
        const first = result.First()

        if (first)
            next(new ValidationError(first.message, first.type, first.schema))
        else
            next()
    }

    return validateBody
}