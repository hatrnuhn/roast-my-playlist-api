import { Router } from "express";
import rateLimit from "express-rate-limit";
import { getRateLimitOptions } from "../config/rateLimitOptions";
import playlistController from '../controllers/playlist'
import { asyncHandler } from "../middlewares/asyncHandler";
import { validate } from "../middlewares/validator";
import { PlaylistGet } from "../types/requests";

const router = Router()

router.route('/:playlistId')
        .get(rateLimit(getRateLimitOptions), validate(PlaylistGet, 'params'), asyncHandler(playlistController.get))

export default router