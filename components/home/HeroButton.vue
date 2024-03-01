<template>
    <div
        class="rounded-lg px-4 py-2 md:px-6 md:py-4 bg-grayscale-600 text-grayscale-200"
    >
        <a href="{{ href }}">{{ name }}</a>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    name: string;
    href: string;
}>();
</script>
