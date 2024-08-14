import { ErrorRequestHandler } from "express"
import { CORSError, ValidationError } from "../types/errors"
import { logEvents } from "./logger"
import { randomUUID } from "crypto"
import { AxiosError } from "axios"

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof ValidationError)
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