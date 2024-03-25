<template>
    <Layout
        title="Logout | Readconquista"
        description="Logout of Readconquista"
    >
        <div
            class="flex h-full items-center justify-center flex-col gap-4 md:gap-8"
        >
            <h2 class="text-3xl md:text-5xl font-black">Logout</h2>
            <h4 class="text-xl md:text-2xl">
                Are you sure you want to log out?
            </h4>
            <div class="flex flex-row gap-8">
                <button
                    type="button"
                    class="p-4 rounded-xl bg-grayscale-800 text-grayscale-400"
                    @click="logout()"
                >
                    Yes
                </button>
                <button
                    type="button"
                    class="p-4 rounded-xl bg-grayscale-400 text-grayscale-800"
                    @click="cancelLogout()"
                >
                    No
                </button>
            </div>
            <div v-if="error" class="mt-2 flex flex-row justify-center">
                <span class="text-red-500 font-bold"
                    >{{ error.statusCode }} - {{ error.statusMessage }}</span
                >
            </div>
        </div>
    </Layout>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

const router = useRouter();
const authStore = useAuthStore();

const error = ref();

const logout = async () => {
    const { requestState } = await authStore.logout();

    if (requestState.error) error.value = requestState.error;
    else await router.push("/");
};

const cancelLogout = async () => {
    await router.push("/");
};

definePageMeta({
    middleware: ["auth"],
});
</script>
