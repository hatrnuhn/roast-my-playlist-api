import gemini from "../libs/gemini"
import spotify from "../libs/spotify"
import YAML from 'yaml'
import roastRepo from '../repositories/roast'

class RoastService {
    public async create(playlistId: string, lang: 'EN' | 'ID' = 'EN') {
        const playlistData = await spotify.getPlaylist(playlistId)
        const prompt = `Roast me off my spotify music playlist (and please do not genderize me), use gen Z internet slangs, and make it less than 100 words long yet edgy. Here is the playlist data in YAML${lang === 'EN' ? '' : ', do it in Bahasa Indonesia'} and DO YOUR WORST! ${YAML.stringify(playlistData)}`
        const roast = await gemini.generateText(prompt)        
        return roastRepo.create(roast, playlistId)
    }

    public async get(roastId: string) {
        const roast = await roastRepo.getOne(roastId)
        return {
            id: roast.id,
            content: roast.content,
            playlistId: roast.playlistId
        }
    }
}

export default new RoastService()