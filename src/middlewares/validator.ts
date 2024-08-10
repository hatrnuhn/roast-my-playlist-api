import { TypeCompiler, ValueErrorIterator } from '@sinclair/typebox/compiler'
import { TSchema } from '@sinclair/typebox'
import { RequestHandler } from 'express'
import { ValidationError } from '../types/errors'

export const validate = (schema: TSchema, from: 'body' | 'params' | 'query') => {
    const compiler = TypeCompiler.Compile(schema)

    const validateReq: RequestHandler = (req, res, next) => {
        let result: ValueErrorIterator
        if (from === 'query')
            result = compiler.Errors(req.query)
        else if (from === 'params')
            result = compiler.Errors(req.params)
        else 
            result = compiler.Errors(req.body)
        
        const first = result.First()

        if (first)
            next(new ValidationError(first.message, first.type, first.schema))
        else {
            res.locals.validated = from === 'params' ? req.params : from === 'query' ? req.query : req.body
            next()
        }
    }

    return validateReq
}