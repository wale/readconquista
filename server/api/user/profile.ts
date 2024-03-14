import protectRoute from "~/server/utils/protectRoute";

export default defineEventHandler(async (event) => {
    const route = await protectRoute(event);

    return {
        id: route.user.id,
        username: route.user.username,
        email: route.user.email,
        role: route.user.role,
        createdAt: route.user.createdAt,
    };
});
