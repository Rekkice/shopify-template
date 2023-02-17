<script setup>
import { ref } from 'vue';

const drawer = ref(null)
const hideDrawer = () => {
    drawer.value.checked = false
}
</script>

<template>
    <div class="min-h-screen relative">
        <TheHeader />
        <div class="pb-36 drawer h-full w-full">
            <input id="my-drawer" type="checkbox" class="drawer-toggle" ref="drawer" title="menu" placeholder=""/>
            <div class="drawer-content min-h-[70vh]">
                <slot />
            </div>
            <div class="drawer-side sm:hidden">
                <label for="my-drawer" class="drawer-overlay sm:hidden"></label>
                <ul class="menu p-4 w-80 bg-slate-100 text-base-content sm:hidden">
                    <li class="text-zinc-800">
                        <NuxtLink
                            to="/"
                            class="hover:border-b-2 hover:pt-px border-black"
                            @click="hideDrawer()"
                        >Home</NuxtLink>
                    </li>
                    <li class="text-zinc-800">
                        <NuxtLink
                            to="/catalog"
                            class="hover:border-b-2 hover:pt-px border-black"
                            @click="hideDrawer()"
                        >Catalog</NuxtLink>
                    </li>
                    <li class="text-zinc-800">
                        <NuxtLink
                            to="/contact"
                            class="hover:border-b-2 hover:pt-px border-black"
                            @click="hideDrawer()"
                        >Contact</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
        <LazyTheFooter/>
    </div>
</template>