import { Router } from "express";
import roastsController from '../controllers/roast'
import { asyncHandler } from "../middlewares/asyncHandler";
import { validate } from "../middlewares/validator";
import { RoastPost } from "../types/requests";
import rateLimit from "express-rate-limit";
import { postGlobalRateLimitOptions, postRateLimitOptions } from "../config/rateLimitOptions";

const router = Router()

router.route('/')
        .post(rateLimit(postRateLimitOptions), validate(RoastPost, 'body'), asyncHandler(roastsController.createRoast))

export default router