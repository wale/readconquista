import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware((to) => {
    const { user } = storeToRefs(useAuthStore());

    console.log(user.value);

    if (to.fullPath === "/login" && user.value.id) return navigateTo("/");
});
