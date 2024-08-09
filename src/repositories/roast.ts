import { PrismaClient } from "@prisma/client";
import playlistRepo from "./playlist";

export class RoastRepo {
    private prisma: PrismaClient

    constructor(prisma: PrismaClient) {
        this.prisma = prisma
    }

    public async create(content: string, playlistId: string) {
        if (! await playlistRepo.isExisting(playlistId))
            await playlistRepo.create(playlistId)

        const roast = await this.prisma.roast.create({
            data: {
                content,
                playlistId
            }
        })

        const { id } = roast
        return { id, content, playlistId }
    }

    public async getOne(roastId: string) {
        const roast = await this.prisma.roast.findUniqueOrThrow({
            where: {
                id: roastId
            },
            include: {
                playlist: true
            }
        })

        return roast
    }
}

export default new RoastRepo(new PrismaClient())