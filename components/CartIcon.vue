<script setup>
import { useCartsStore } from "../stores/cart"

const store = useCartsStore()

</script>

<template>
    <NuxtLink to="/cart" class="indicator w-[50] h-[47px] mr-2 xl:w-[50px]">
        <div class="indicator-item indicator-bottom badge badge-primary text-white px-[5px]" style="top: 18px; right: 12px">
            {{ store.count }}
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M12.75 42q-1.15 0-1.95-.8t-.8-1.95v-22.5q0-1.15.8-1.95t1.95-.8h4.5v-1.25q0-2.8 1.95-4.775Q21.15 6 24 6q2.85 0 4.8 1.975 1.95 1.975 1.95 4.775V14h4.5q1.15 0 1.95.8t.8 1.95v22.5q0 1.15-.8 1.95t-1.95.8Zm0-1.55h22.5q.45 0 .825-.375.375-.375.375-.825v-22.5q0-.45-.375-.825-.375-.375-.825-.375h-4.5v5.2q0 .35-.225.575-.225.225-.525.225-.35 0-.55-.225-.2-.225-.2-.575v-5.2h-10.5v5.2q0 .35-.225.575-.225.225-.525.225-.35 0-.55-.225-.2-.225-.2-.575v-5.2h-4.5q-.45 0-.825.375-.375.375-.375.825v22.5q0 .45.375.825.375.375.825.375Zm6-26.45h10.5v-1.25q0-2.2-1.525-3.7T24 7.55q-2.2 0-3.725 1.5t-1.525 3.7Zm-7.2 26.45v-24.9 24.9Z"/></svg>
    </NuxtLink>
</template>