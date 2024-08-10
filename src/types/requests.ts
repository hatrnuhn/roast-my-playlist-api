import { Type } from "@sinclair/typebox";

export const RoastPost = Type.Object({
    playlistId: Type.String({ pattern: '^[a-zA-Z0-9_-]{22}$' }),
    language: Type.Optional(Type.Union([
        Type.Literal('en'),
        Type.Literal('id')
    ], {
        default: 'en'
    }))
})

export const RoastGet = Type.Object({
    roastId: Type.String({ 
        minLength: 25,
        maxLength: 30,
        pattern: '^[a-z0-9]+$'
     })
})

export const PlaylistGet = Type.Object({
    playlistId: Type.String({ pattern: '^[a-zA-Z0-9_-]{22}$' })
})