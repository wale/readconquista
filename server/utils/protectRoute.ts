import { Role } from "@prisma/client";
import { type H3Event } from "h3";
import jwt from "jsonwebtoken";

const protectRoute = async (event: H3Event, role: Role = Role.USER) => {
    const runtimeConfig = useRuntimeConfig();
    const authHeaders = event.headers.get("Authorization");

    if (authHeaders === null || authHeaders === "")
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized: No headers passed.",
        });

    // Authorization: Bearer [jwt....]
    const [, bearerToken] = authHeaders.split(" ");
    const bearerVerified = jwt.verify(
        bearerToken,
        runtimeConfig.jwtAccessSecret,
    );

    if (new Date().getTime() > (bearerVerified as jwt.JwtPayload).exp! * 1000)
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized: invalid token",
        });

    if (!(bearerVerified as jwt.JwtPayload).userId)
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized: invalid token",
        });

    // check role verification
    const user = await db.user.findFirst({
        where: {
            id: (bearerVerified as jwt.JwtPayload).userId,
        },
    });

    if (!user)
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized: invalid user",
        });

    if (user.role !== role && user.role !== Role.ADMIN)
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized: invalid permissions",
        });

    return { user };
};

export default protectRoute;
