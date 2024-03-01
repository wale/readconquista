<template>
    <div
        class="flex h-full items-center justify-center flex-col gap-4 md:gap-8 pt-24"
    >
        <h1 class="text-4xl md:text-7xl font-black">Readconquista</h1>
        <h3 class="text-lg md:text-3xl font-medium">
            Wale's Melbourne library card collection.
        </h3>
        <div class="flex flex-row gap-4">
            <HeroButton name="Libraries" href="/libraries" />
            <HeroButton name="Map" href="/map" />
        </div>
    </div>
</template>

<script setup>
import HeroButton from "./HeroButton.vue";
</script>
