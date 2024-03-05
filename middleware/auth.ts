import jwt from "jsonwebtoken";
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware((to) => {
    const runtimeConfig = useRuntimeConfig();
    const { user } = storeToRefs(useAuthStore());

    console.log(user.value);

    if (to.fullPath === "/login" && user.value.id) return navigateTo("/");

    if (!user.value.id) return navigateTo("/login");
    else
        try {
            // Verify JWT access token
            const verificationPayload = jwt.verify(
                user.value.accessToken,
                runtimeConfig.jwtAccessSecret,
            );

            if ((verificationPayload as jwt.JwtPayload).jti)
                return navigateTo(to.fullPath);
            else return navigateTo("/login");
        } catch (err) {
            throw createError({
                statusCode: 500,
                statusMessage: `Server error: ${(err as Error).name}`,
            });
        }
});
