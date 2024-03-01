<template>
    <header>
        <nav
            class="flex flex-row max-w-screen-xl py-8 px-8 mx-auto items-center self-center justify-between"
        >
            <div>
                <a href="/">
                    <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
                    <nuxt-img src="/walebrary_logo.svg" class="h-8" />
                </a>
            </div>
            <div>
                <svg
                    id="menu-button"
                    class="h-6 w-6 cursor-pointer md:hidden block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    @click="show = !show"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
                <div
                    :class="show ? '' : 'hidden'"
                    class="relative md:pb-0 md:pt-0 md:flex md:flex-row"
                >
                    <ul
                        class="absolute -right-1 md:-top-6 text-grayscale-950 rounded-md bg-grayscale-400 md:bg-inherit pl-8 pr-4 mt-4 md:pl-0 md:pr-0 md:m-0 md:flex md:flex-row text-right"
                    >
                        <li>
                            <a href="/login" class="md:p-4 py-2 block">Login</a>
                        </li>
                        <li>
                            <a href="/libraries" class="md:p-4 py-2 block"
                                >Libraries</a
                            >
                        </li>
                        <li>
                            <a href="/map" class="md:p-4 py-2 block">Map</a>
                        </li>
                        <li>
                            <a href="/about" class="md:p-4 py-2 block">About</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { ref } from "vue";

const show = ref(false);
</script>
