import { randomUUID } from "crypto"
import { RequestHandler } from "express"
import fs from 'fs'
import fsPromises from 'fs/promises'
import path from "path"

export const logEvents = async (message: string, logFileName: string) => {
    const dateTime = `${new Date().toISOString()}`
    const logItem = `${dateTime}\t${message}\n`
    
    try {
        if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs')))
            await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'))

        await fsPromises.appendFile(path.join(__dirname, '..', '..', 'logs', logFileName), logItem)
    } catch (err) {
        throw err
    }
}

const logger: RequestHandler = async (req, res, next) => {
    try {
        const requestEventId = randomUUID()
        const message = `${requestEventId}\t${req.method}\t${req.url}\t${req.headers.origin}`
        console.log(`${req.method} ${req.path} @${requestEventId} from ${req.ip}`)
        await logEvents(message, 'reqsLog.log')
    } catch (err) {
        if (err instanceof Error) 
            console.error('An error happened when logging an event: ', err.message)

        next(err)
    } finally {
        next()
    }
}

export default logger