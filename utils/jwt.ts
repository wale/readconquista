import { type User } from "@prisma/client";
import jwt from "jsonwebtoken";

import crypto from "node:crypto";

const runtimeConfig = useRuntimeConfig();

export function hashToken(token: string) {
    return crypto.createHash("sha512").update(token).digest("hex");
}

export function generateAccessToken(user: User): string {
    return jwt.sign({ userId: user.id }, runtimeConfig.jwtAccessSecret, {
        expiresIn: "5m",
    });
}

export function generateRefreshToken(user: User, jti: string) {
    return jwt.sign(
        {
            userId: user.id,
            jti,
        },
        runtimeConfig.jwtRefreshSecret,
        {
            expiresIn: "8h",
        },
    );
}

export function generateTokens(user: User, jti: string) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user, jti);

    return {
        accessToken,
        refreshToken,
    };
}
