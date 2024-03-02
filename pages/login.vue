<template>
    <Layout title="Login | Readconquista" description="Login to Readconquista">
        <div
            class="flex h-full items-center justify-center flex-col gap-4 md:gap-8 pt-24"
        >
            <h2 class="text-xl md:text-2xl font-semibold">Login</h2>
        </div>
    </Layout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useAuthStore } from "~/utils/authStore";
import { pinia } from "~/utils/pinia";

const { authenticated } = storeToRefs(useAuthStore(pinia));
</script>
