import { Router } from "express";
import roastsController from '../controllers/roast'
import { asyncHandler } from "../middlewares/asyncHandler";
import { validate } from "../middlewares/validator";
import { RoastPost } from "../types/reqBodies";

const router = Router()

router.route('/')
        .post(validate(RoastPost), asyncHandler(roastsController.createRoast))
router.route('/:roastId')
        .get(asyncHandler(roastsController.getRoast))

export default router