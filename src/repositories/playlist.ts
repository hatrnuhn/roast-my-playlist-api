import { PrismaClient } from "@prisma/client"

export class PlaylistRepo {
    private prisma: PrismaClient

    constructor(prisma: PrismaClient) {
        this.prisma = prisma
    }

    public async isExisting(playlistId: string) {
        const playlist = await this.prisma.playlist.findUnique({
            where: {
                id: playlistId
            }
        })

        return (!!playlist)
    }

    public async create(playlistId: string) {
        const playlist = await this.prisma.playlist.create({
            data: {
                id: playlistId
            }
        })

        return playlist.id
    }

    public async get(playlistId: string) {
        const playlist = await this.prisma.playlist.findUniqueOrThrow({
            where: {
                id: playlistId
            }, 
            include: {
                _count: true,
                roasts: {
                    select: {
                        id: true,
                        content: true
                    }
                }
            }
        })

        return {
            id: playlist.id,
            roasts: playlist.roasts,
            roastsCount: playlist._count.roasts
        }
    }
}

export default new PlaylistRepo(new PrismaClient())