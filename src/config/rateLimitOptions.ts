import { Options } from "express-rate-limit";

const rateLimitOptions: Partial<Options> = {
    windowMs: 1 * 60 * 1000,
    limit: 500,
    standardHeaders: true,
    legacyHeaders: false
}

export default rateLimitOptions