import { defineStore } from "pinia";

interface RequestState {
    loading: boolean;
    error: Error | null;
}

interface UserState {
    id: string;
    username: string;
    email: string;
    accessToken: string;
    refreshToken: string;
}

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: {} as UserState,
    }),
    actions: {
        async login(
            password: string,
            username?: string,
            email?: string,
        ): Promise<{ data: UserState; requestState: RequestState }> {
            const requestState: RequestState = {
                loading: true,
                error: null,
            };

            if (username === "")
                try {
                    const data: UserState = await $fetch("/api/auth/login", {
                        method: "post",
                        headers: { "Content-Type": "application/json" },
                        body: {
                            password,
                            email,
                        },
                    });
                    requestState.loading = false;
                    this.user = data;
                    return { data, requestState };
                } catch (error) {
                    requestState.loading = false;
                    requestState.error = error as Error;
                    return { data: {} as UserState, requestState };
                }

            if (email === "")
                try {
                    const data: UserState = await $fetch("/api/auth/login", {
                        method: "post",
                        headers: { "Content-Type": "application/json" },
                        body: {
                            username,
                            password,
                        },
                    });

                    requestState.loading = false;
                    this.user = data;
                    return { data, requestState };
                } catch (error) {
                    requestState.loading = false;
                    requestState.error = error as Error;
                    return { data: {} as UserState, requestState };
                }
            return { data: {} as UserState, requestState };
        },

        async logout() {
            await revokeTokensByIdentifier({ email: this.user.email });

            this.user = {} as UserState;
        },

        async register(
            password: string,
            username: string,
            email: string,
        ): Promise<{ data: UserState; requestState: RequestState }> {
            const requestState: RequestState = {
                loading: true,
                error: null,
            };

            try {
                const data: UserState = await $fetch("/api/auth/register", {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: {
                        password,
                        username,
                        email,
                    },
                });
                requestState.loading = false;
                this.user = data;
                return { data, requestState };
            } catch (error) {
                requestState.loading = false;
                requestState.error = error as Error;
                return { data: {} as UserState, requestState };
            }
        },
    },
});
