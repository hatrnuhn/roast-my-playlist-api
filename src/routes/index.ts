import { Router } from "express"
import roastRouter from './roast'

const router = Router()

router.use('/roasts', roastRouter)

export default router