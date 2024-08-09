import { RequestHandler } from "express";

export const asyncHandler  = (fn: RequestHandler) => {
    const wrapper: RequestHandler = async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (err) {
            next(err)
        }
    }

    return wrapper
}