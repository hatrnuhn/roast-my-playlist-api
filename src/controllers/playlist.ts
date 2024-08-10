import { RequestHandler } from "express";
import playlistService from '../services/playlist'

class PlaylistController {
    public get: RequestHandler = async (req, res) => {
        const { playlistId } = res.locals.validated
        const playlist = await playlistService.getOne(playlistId)
        res.status(200).json(playlist)
    }
}

export default new PlaylistController()