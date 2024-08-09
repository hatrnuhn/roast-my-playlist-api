import { ErrorRequestHandler } from "express"
import { CORSError, ValidationError } from "../types/errors"
import { logEvents } from "./logger"
import { randomUUID } from "crypto"
import { AxiosError } from "axios"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

const BadRequestCodes = ['P2000', 'P2006', 'P2007', 'P2012', 'P2013', 'P2016', 'P2019', 'P2020', 'P2029', 'P2030', 'P2033']
const NotFoundCodes = ['P2001', 'P2015', 'P2018', 'P2021', 'P2022']
const ConflictCodes = ['P2002', 'P2003', 'P2004', 'P2011', 'P2014', 'P2017', 'P2025', 'P2034']
const UnprocessableCodes = ['P2005', 'P2023']


const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof PrismaClientKnownRequestError) {
        if (BadRequestCodes.includes(err.code))
            res.status(400)
        else if (NotFoundCodes.includes(err.code))
            res.status(404)
        else if (ConflictCodes.includes(err.code))
            res.status(409)
        else if (UnprocessableCodes.includes(err.code))
            res.status(422)
    } else if (err instanceof ValidationError)
        res.status(400)
    else if (err instanceof CORSError)
        res.status(err.code)
    else if (err instanceof AxiosError && err.response)
        res.status(err.response.status)
    else
        res.status(500)

    if (err instanceof Error) {
        logEvents(`${randomUUID()}\t${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errsLog.log')
        console.error(err.stack)
        res.send({message: err.message})
    }
}

export default errorHandler