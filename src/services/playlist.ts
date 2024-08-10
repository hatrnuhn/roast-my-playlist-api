import playlistRepo from "../repositories/playlist"

class PlaylistService {
    public getOne = async (playlistId: string) => {
        const playlist = await playlistRepo.get(playlistId)
        return playlist
    }
}

export default new PlaylistService()