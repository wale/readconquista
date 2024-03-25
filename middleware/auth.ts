import { storeToRefs } from "pinia";

import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to) => {
    const { user } = storeToRefs(useAuthStore());

    if (to.fullPath === "/login" && user.value.id) return navigateTo("/");

    if (!user.value.id) return navigateTo("/login");
    else return navigateTo(to.fullPath);
});
