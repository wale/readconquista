<template>
    <Layout
        title="Register | Readconquista"
        description="Register an account in Readconquista!"
    >
        <div
            class="flex h-full items-center justify-center flex-col gap-4 md:gap-8"
        >
            <h2 class="text-3xl md:text-5xl font-black">Register</h2>
            <form class="flex flex-col gap-4" @submit.prevent="register()">
                <div>
                    <input
                        v-model="email"
                        type="email"
                        class="rounded-lg resize-none w-full block bg-grayscale-400 px-4 py-2 placeholder:justify-center"
                        placeholder="Email address"
                    />
                </div>
                <div>
                    <input
                        v-model="username"
                        class="rounded-lg resize-none w-full block bg-grayscale-400 px-4 py-2 placeholder:justify-center"
                        placeholder="Username"
                    />
                </div>
                <div>
                    <input
                        v-model="password"
                        type="password"
                        class="rounded-lg resize-none w-full block bg-grayscale-400 px-4 py-2 placeholder:justify-center"
                        placeholder="Password"
                    />
                </div>
                <div class="mt-4">
                    <button
                        type="submit"
                        class="rounded-xl w-full p-2"
                        :disabled="!email || !password || !username"
                        :class="
                            email && username && password
                                ? 'bg-grayscale-900 text-grayscale-400'
                                : 'bg-grayscale-400 text-grayscale-900'
                        "
                    >
                        Register
                    </button>
                </div>
            </form>
            <div v-if="error" class="mt-2 flex flex-row justify-center">
                <span class="text-red-500 font-bold"
                    >{{ error.statusCode }} - {{ error.statusMessage }}</span
                >
            </div>
        </div>
    </Layout>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { useAuthStore } from "~/utils/authStore";

const userStore = useAuthStore();

const email = ref("");
const username = ref("");
const password = ref("");

const error = ref();

const router = useRouter();

const register = async () => {
    const { data, requestState } = await userStore.register(
        password.value,
        username.value,
        email.value,
    );

    if (requestState.error) error.value = requestState.error;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    else if (data) await router.push("/");
};
</script>
