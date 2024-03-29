import { defineStore } from "pinia";

interface RequestState {
    loading: boolean;
    error: Error | null;
}

interface RefreshState {
    accessToken: string;
    refreshToken: string;
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

        async logout(): Promise<{ requestState: RequestState }> {
            const requestState: RequestState = {
                loading: true,
                error: null,
            };

            try {
                await $fetch("/api/auth/logout", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.user.accessToken}`,
                    },
                });
                requestState.loading = false;
                this.user = {} as UserState;
                return { requestState };
            } catch (error) {
                requestState.loading = false;
                requestState.error = error as Error;
                return { requestState };
            }
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
        async refresh(
            refreshToken: string,
        ): Promise<{ data: RefreshState; requestState: RequestState }> {
            const requestState: RequestState = {
                loading: true,
                error: null,
            };
            try {
                const data: RefreshState = await $fetch("/api/auth/refresh", {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: {
                        refreshToken,
                    },
                });
                requestState.loading = false;

                this.user.refreshToken = data.refreshToken;
                this.user.accessToken = data.accessToken;

                return { data, requestState };
            } catch (error) {
                requestState.loading = false;
                requestState.error = error as Error;
                return { data: {} as RefreshState, requestState };
            }
        },
    },
    persist: true,
});
