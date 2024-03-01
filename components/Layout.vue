<template>
    <body class="bg-grayscale-300 text-grayscale-950">
        <slot />
    </body>
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
</script>
