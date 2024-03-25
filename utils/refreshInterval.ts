import { useAuthStore } from "~/store/auth";

export default function refreshInterval(): number | null {
    const authStore = useAuthStore();

    if (authStore.user.accessToken) {
        const [, jwtBase64] = authStore.user.accessToken.split(".");
        const jwtToken = JSON.parse(atob(jwtBase64));

        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - 60 * 1000;

        return window.setTimeout(async () => {
            await authStore.refresh(authStore.user.refreshToken);
        }, timeout);
    } else return null;
}
