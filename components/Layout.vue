<template>
    <div
        class="flex flex-col flex-grow h-screen bg-grayscale-300 text-grayscale-950"
    >
        <Nav />
        <slot />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string;
    description: string;
}>();

const { title, description } = toRefs(props);

useHead({
    title: title.value,
    meta: [{ name: "description", content: description.value }],
});

const userStore = useAuthStore();
const { user } = storeToRefs(userStore);

const pollRefresh = async () => {
    // eslint-disable-next-line no-useless-return
    if (!user.value.id) return;
    else {
        const { requestState } = await userStore.refresh(
            user.value.refreshToken,
        );
        if (requestState.error) throw requestState.error;
    }
};

onMounted(() => {
    setInterval(pollRefresh, 30_000); // poll refresh token API every 30s
});
</script>
