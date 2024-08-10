import { Router } from "express";
import roastsController from '../controllers/roast'
import { asyncHandler } from "../middlewares/asyncHandler";
import { validate } from "../middlewares/validator";
import { RoastGet, RoastPost } from "../types/requests";
import rateLimit from "express-rate-limit";
import { getRateLimitOptions, postGlobalRateLimitOptions, postRateLimitOptions } from "../config/rateLimitOptions";

const router = Router()

router.route('/')
        .post(rateLimit(postGlobalRateLimitOptions), rateLimit(postRateLimitOptions), validate(RoastPost, 'body'), asyncHandler(roastsController.createRoast))
router.route('/:roastId')
        .get(rateLimit(getRateLimitOptions) , validate(RoastGet, 'params'), asyncHandler(roastsController.getRoast))

export default router