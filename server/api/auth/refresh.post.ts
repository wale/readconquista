import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import { z } from "zod";

const schema = z.object({
    refreshToken: z.string(),
});

export default defineEventHandler(async (event) => {
    const result = await readValidatedBody(event, (body) =>
        schema.safeParse(body),
    );

    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    if (!result.success) throw result.error.issues;

    const runtimeConfig = useRuntimeConfig();

    const payload = jwt.verify(
        result.data.refreshToken,
        runtimeConfig.jwtRefreshSecret,
    ) as jwt.JwtPayload;

    if (new Date().getTime() > payload.exp!)
        throw createError({
            statusCode: 403,
            statusMessage: "Forbidden: token is still valid",
        });

    const savedRefreshToken = await findRefreshTokenById(payload.jti!);

    if (!savedRefreshToken || savedRefreshToken.revoked)
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized: token revoked",
        });

    const hashedToken = hashToken(result.data.refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken)
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized: refresh token mismatch",
        });

    const user = await db.user.findFirst({
        where: {
            id: payload.userId,
        },
    });

    if (!user)
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized: user not found",
        });

    await deleteRefreshToken(savedRefreshToken.id);
    const jti = v4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
        user,
        jti,
    );
    await addRefreshToken(jti, newRefreshToken, user);

    return {
        accessToken,
        refreshToken: newRefreshToken,
    };
});
