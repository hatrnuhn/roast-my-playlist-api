import express from 'express'
import cors from 'cors'
import path from 'path'
import logger from './middlewares/logger'
import corsOptions from './config/corsOptions'
import errorHandler from './middlewares/errorHandler'
import apiRouter from './routes'
import rateLimit from 'express-rate-limit'
import rateLimitOptions from './config/rateLimitOptions'

const server = express()
const version = process.env.VERSION || 'v1'

server.use(logger)
server.use(cors(corsOptions))
server.use(rateLimit(rateLimitOptions))
server.use('/', express.static(path.join(__dirname, '..', '/public')))
        .get('^/$|/index(.html)?', (req, res) => res.sendFile(path.join(__dirname, '..', 'views', 'index.html')))
server.use(express.json())
server.use(express.urlencoded({ extended: false }))

// main router
server.use((`/${version}`), apiRouter)

server.all('*', (req, res) => {
    res.status(404)

    // returns 404 based on the request's acceptable response format
    if (req.accepts('html'))
        res.sendFile(path.join(__dirname, '..', 'views', '404.html'))
    else if (req.accepts('json'))
        res.json({ message: '404 Not Found' })
    else 
        res.type('txt').send('404 Not Found')
})

server.use(errorHandler)

export default server