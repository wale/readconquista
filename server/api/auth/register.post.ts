import * as argon2 from "argon2";
import { v4 } from "uuid";
import { z } from "zod";

import db from "~/utils/db";
import { generateTokens } from "~/utils/jwt";
import { addRefreshToken } from "~/utils/refreshToken";

const schema = z.object({
    username: z.string().min(3),
    password: z.string().min(8),
    email: z.string().email().min(5),
});

export default defineEventHandler(async (event) => {
    const result = await readValidatedBody(event, (body) =>
        schema.safeParse(body),
    );

    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    if (!result.success) throw result.error.issues;

    // do things with the Zod result data
    const byUser = await db.user.findFirst({
        where: {
            OR: [
                {
                    username: result.data.username,
                },
                {
                    email: result.data.email,
                },
            ],
        },
    });

    if (byUser === null) {
        const hash = await argon2.hash(result.data.password);
        try {
            const user = await db.user.create({
                data: {
                    email: result.data.email,
                    username: result.data.username,
                    password: hash,
                    role: "USER",
                },
            });
            const jti = v4();
            const { accessToken, refreshToken } = generateTokens(user, jti);
            await addRefreshToken(jti, refreshToken, user);

            return {
                id: user.id,
                username: user.username,
                email: user.email,
                accessToken,
                refreshToken,
            };
        } catch (err) {
            let message = "Unknown server error";
            // eslint-disable-next-line prefer-destructuring
            if (err instanceof Error) message = err.message;
            throw createError({
                statusCode: 500,
                statusMessage: message,
            });
        }
    } else
        throw createError({
            statusCode: 400,
            statusMessage: `User ${result.data.email} already exists.`,
        });
});
