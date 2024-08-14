import { RequestHandler } from "express";
import roastService from '../services/roast'

class RoastController {
    public createRoast: RequestHandler = async (req, res) => {
        const { playlistId, language } = res.locals.validated
        const roast = await roastService.create(playlistId, language)
        res.status(200).json(roast)
    }
}

export default new RoastController()