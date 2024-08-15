import { Options, ValueDeterminingMiddleware } from "express-rate-limit";

const keyGenerator: ValueDeterminingMiddleware<string> = (req, res) => {
    return `${req.method}:${req.ip}`
} 

export const postRateLimitOptions: Partial<Options> = {
    windowMs: 1 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator,
    skip: req => req.method !== 'POST'
}

export const getRateLimitOptions: Partial<Options> = {
    windowMs: 1 * 60 * 1000,
    limit: 30,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator,
    skip: req => req.method !== 'GET'
}

export const postGlobalRateLimitOptions: Partial<Options> = {
    windowMs: 1 * 60 * 1000,
    limit: 900,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: () => 'post global limit',
    skip: req => req.method !== 'POST'
}