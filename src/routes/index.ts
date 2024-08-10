import { Router } from "express"
import roastRouter from './roast'
import playlistRouter from './playlist'

const router = Router()

router.use('/roasts', roastRouter)
router.use('/playlists', playlistRouter)

export default router