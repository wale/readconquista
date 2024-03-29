import { type User } from "@prisma/client";
import * as argon2 from "argon2";
import { v4 } from "uuid";
import { z } from "zod";

import db from "~/server/utils/db";
import { generateTokens } from "~/server/utils/jwt";
import { addRefreshToken } from "~/server/utils/refreshToken";

const schema = z.object({
    username: z.string().optional(),
    password: z.string(),
    email: z.string().email().optional(),
});

export default defineEventHandler(async (event) => {
    const result = await readValidatedBody(event, (body) =>
        schema.safeParse(body),
    );

    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    if (!result.success) throw result.error.issues;

    let byUser: User | null;

    if (result.data.username === "" || result.data.username === undefined) {
        byUser = await db.user.findFirst({
            where: {
                email: result.data.email,
            },
        });

        if (byUser === null)
            throw createError({
                statusCode: 403,
                statusMessage: "No user found with that email/username.",
            });
        else {
            // Check if the password matches
            const validPassword = await argon2.verify(
                byUser.password,
                result.data.password,
            );

            if (!validPassword)
                throw createError({
                    statusCode: 403,
                    statusMessage: "Invalid password.",
                });

            const jti = v4();
            const { accessToken, refreshToken } = generateTokens(byUser, jti);
            await addRefreshToken(jti, refreshToken, byUser);

            return {
                id: byUser.id,
                username: byUser.username,
                email: byUser.email,
                accessToken,
                refreshToken,
            };
        }
    }

    if (result.data.email === "" || result.data.email === undefined) {
        byUser = await db.user.findFirst({
            where: {
                username: result.data.username,
            },
        });

        if (byUser === null)
            throw createError({
                statusCode: 403,
                statusMessage: "No user found with that email/username.",
            });
        else {
            // Check if the password matches
            const validPassword = await argon2.verify(
                byUser.password,
                result.data.password,
            );

            if (!validPassword)
                throw createError({
                    statusCode: 403,
                    statusMessage: "Invalid password.",
                });

            const jti = v4();
            const { accessToken, refreshToken } = generateTokens(byUser, jti);
            await addRefreshToken(jti, refreshToken, byUser);

            return {
                id: byUser.id,
                username: byUser.username,
                email: byUser.email,
                accessToken,
                refreshToken,
            };
        }
    }
});
