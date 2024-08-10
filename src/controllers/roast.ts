import { AxiosInstance } from "axios";
import axios from "../axios";
import { RequestHandler } from "express";
import roastService from '../services/roast'

class RoastController {
    private axios: AxiosInstance

    constructor(axios: AxiosInstance) {
        this.axios = axios
    }

    public createRoast: RequestHandler = async (req, res) => {
        const { playlistId, language } = res.locals.validated
        const roast = await roastService.create(playlistId, language)
        res.status(200).json(roast)
    }

    public getRoast: RequestHandler = async (req, res) => {
        const { roastId } = res.locals.validated
        const roast = await roastService.get(roastId)
        res.status(200).json(roast)
    }
}

export default new RoastController(axios)