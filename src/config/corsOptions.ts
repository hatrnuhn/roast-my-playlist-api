import { CorsOptions } from 'cors'
import { CORSError } from '../types/errors'

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(' ') : '*'

const corsOptions: CorsOptions = {
    credentials: true,
    origin: (requestOrigin, cb) => {
        if (allowedOrigins.indexOf(requestOrigin!) !== -1 || !requestOrigin)
            cb(null, true)
        else
            cb(new CORSError('Not allowed by CORS'))
    }
}

export default corsOptions