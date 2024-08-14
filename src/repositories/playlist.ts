import { RedisClientType, RedisFunctions, RedisModules, RedisScripts } from "@redis/client";
import { newClient } from "../redis";
import { RedisDefaultModules } from "redis";
import { Playlist } from "../types/spotify";

export class PlaylistRepo {
    private redis: RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>

    constructor(redis: RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>) {
        this.redis = redis
    }

    public static async createInstance() {
        const redis = await newClient()
        const instance = new PlaylistRepo(redis)
        return instance
    }

    public async create(playlistId: string, playlist: Playlist) {
        await this.redis.setEx(playlistId, 2 * 60, JSON.stringify(playlist))
    }

    public async get(playlistId: string) {
        const redis = await newClient()
        const data = await redis.get(playlistId)
        
        if (!data)
            return null

        return JSON.parse(data) as Playlist
    }
}