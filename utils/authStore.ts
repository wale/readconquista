import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        accessToken: "",
        refreshToken: "",
        username: "",
        email: "",
        authenticated: false,
    }),
    actions: {
        async login(password: string, username?: string, email?: string) {
            const { data } = await useFetch("/api/auth/login", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: {
                    password,
                    username,
                    email,
                },
            });

            if (data.value) {
                this.$state.accessToken = data.value.accessToken;
                this.$state.refreshToken = data.value.refreshToken;
                this.$state.username = data.value.username;
                this.$state.email = data.value.email;

                this.authenticated = true;
            }
        },
        async logout() {
            await revokeTokensByIdentifier({ email: this.$state.email });

            this.$state.accessToken = "";
            this.$state.refreshToken = "";
            this.$state.username = "";
            this.$state.email = "";
            this.authenticated = false;
        },
    },
});
