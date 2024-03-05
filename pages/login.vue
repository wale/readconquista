<template>
    <Layout title="Login | Readconquista" description="Login to Readconquista">
        <div
            class="flex h-full items-center justify-center flex-col gap-4 md:gap-8"
        >
            <h2 class="text-3xl md:text-5xl font-black">Login</h2>
            <h3
                v-if="formIsEmail === true"
                class="underline underline-offset-4 decoration-grayscale-800 font-light text-lg text-grayscale-800 cursor-pointer"
                @click="formIsEmail = !formIsEmail"
            >
                Using a username?
            </h3>
            <h3
                v-else
                class="underline underline-offset-4 decoration-grayscale-800 font-light text-lg text-grayscale-800 cursor-pointer"
                @click="formIsEmail = !formIsEmail"
            >
                Using an email address?
            </h3>
            <form class="flex flex-col gap-4" @submit.prevent="login()">
                <div>
                    <input
                        v-if="formIsEmail === true"
                        v-model="email"
                        type="email"
                        class="rounded-lg resize-none w-full block bg-grayscale-400 px-4 py-2 placeholder:justify-center"
                        placeholder="Email address"
                    />
                    <input
                        v-else
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
                        v-if="formIsEmail === true"
                        type="submit"
                        class="rounded-xl w-full p-2"
                        :disabled="!email || !password"
                        :class="
                            email && password
                                ? 'bg-grayscale-900 text-grayscale-400'
                                : 'bg-grayscale-400 text-grayscale-900'
                        "
                    >
                        Log In
                    </button>
                    <button
                        v-else
                        type="submit"
                        class="rounded-xl w-full p-2"
                        :disabled="!username || !password"
                        :class="
                            username && password
                                ? 'bg-grayscale-900 text-grayscale-400'
                                : 'bg-grayscale-400 text-grayscale-900'
                        "
                    >
                        Log In
                    </button>
                </div>
                <div v-if="error" class="mt-2 flex flex-row justify-center">
                    <span class="text-red-500 font-bold"
                        >{{ error.statusCode }} -
                        {{ error.statusMessage }}</span
                    >
                </div>
            </form>
        </div>
    </Layout>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { useAuthStore } from "~/utils/authStore";
import { pinia } from "~/utils/pinia";

const userStore = useAuthStore(pinia);

// Check if the user has selected username or email
const formIsEmail = ref(false);

const email = ref("");
const username = ref("");
const password = ref("");

// I'm so fucking sorry.
const error = ref();

const router = useRouter();

const login = async () => {
    const { data, requestState } = await userStore.login(
        password.value,
        username.value,
        email.value,
    );

    if (requestState.error) error.value = requestState.error;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    else if (data) await router.push("/");
};
</script>
