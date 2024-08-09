import { Type } from "@sinclair/typebox";

export const RoastPost = Type.Object({
    playlistId: Type.String({ pattern: '^[a-zA-Z0-9_-]{22}$' })
})