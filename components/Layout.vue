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

const interval = ref();

onMounted(() => {
    interval.value = refreshInterval();
});

onBeforeUnmount(() => {
    window.clearTimeout(interval.value);
});
</script>
