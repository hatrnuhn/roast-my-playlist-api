import gemini from "../libs/gemini"
import spotify from "../libs/spotify"
import YAML from 'yaml'
import { PlaylistRepo } from "../repositories/playlist"
import { Playlist } from "../types/spotify"

class RoastService {
    public async create(playlistId: string, lang: 'EN' | 'ID' = 'EN') {
        const playlistRepo = await  PlaylistRepo.createInstance()
        const cachedData = await playlistRepo.get(playlistId)
        let playlistData: Playlist | null = null

        if (!cachedData) {
            playlistData = await spotify.getPlaylist(playlistId)
            await playlistRepo.create(playlistId, playlistData)
        }
        else
            playlistData = cachedData

        const prompt = `Roast me off my Spotify music playlist, use gen Z internet slangs, do not genderize me and use gender-neutral pronounts, lastly make it less than 120 words long yet edgy. Here is the playlist data in YAML${lang === 'EN' ? '' : ', do it in Bahasa Indonesia'} and DO YOUR WORST! ${YAML.stringify(playlistData)}`
        const roast = await gemini.generateText(prompt)

        return {
            playlistId,
            content: roast,
            createdAt: new Date().toISOString()
        }
    }
}

export default new RoastService()