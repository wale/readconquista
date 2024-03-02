import { type User } from "@prisma/client";

import db from "./db";
import { hashToken } from "./jwt";

export function findRefreshTokenById(id: string) {
    return db.refreshToken.findUnique({
        where: {
            id,
        },
    });
}

export function deleteRefreshToken(id: string) {
    return db.refreshToken.update({
        where: {
            id,
        },
        data: {
            revoked: true,
        },
    });
}

export async function revokeTokensByIdentifier({ username = "", email = "" }) {
    const byUser = await db.user.findFirst({
        where: {
            OR: [{ username }, { email }],
        },
    });
    if (byUser == null)
        throw createError({
            statusCode: 500,
            statusMessage: "Could not revoke tokens.",
        });
    else
        await db.refreshToken.updateMany({
            where: {
                userId: byUser.id,
            },
            data: {
                revoked: true,
            },
        });
}

export function addRefreshToken(jti: string, refreshToken: string, user: User) {
    return db.refreshToken.create({
        data: {
            id: jti,
            hashedToken: hashToken(refreshToken),
            userId: user.id,
        },
    });
}
