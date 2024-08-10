import { Options, ValueDeterminingMiddleware } from "express-rate-limit";

const keyGenerator: ValueDeterminingMiddleware<string> = (req, res) => {
    return `${req.method}:${req.ip}`
} 

export const postRateLimitOptions: Partial<Options> = {
    windowMs: 1 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator
}

export const getRateLimitOptions: Partial<Options> = {
    windowMs: 1 * 60 * 1000,
    limit: 15,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator
}

export const postGlobalRateLimitOptions: Partial<Options> = {
    windowMs: 1 * 60 * 1000,
    limit: 900,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: () => 'post global limit'
}