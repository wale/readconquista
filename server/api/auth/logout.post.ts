export default defineEventHandler(async (event) => {
    const { user } = await protectRoute(event);

    revokeTokensByIdentifier({ username: user.username })
        .then(() => setResponseStatus(event, 200, "Successfully logged out"))
        .catch((err) =>
            createError({
                statusCode: 500,
                statusMessage: `${(err as Error).message}`,
            }),
        );
});
