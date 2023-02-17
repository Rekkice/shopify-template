<script setup>
const route = useRoute()
const searchBar = ref(null)
const showBar = ref(false)
const search = ref(false)
const searchInput = ref('')

const searchClick = (event) => {
    showBar.value = event.target.checked
    if (event.target.checked) {
        setTimeout(() => {
            searchBar.value.focus()
        }, 100)
    }
}

const collapseSearch = () => {
    // console.log(search.value)
    search.value.checked = false
    showBar.value = false
}
</script>

<template>
<header class="w-full bg-white min-h-[5rem] border-b border-slate-300 py-1">
    <div class="m-auto max-w-5xl h-full flex justify-between
                text-xl font-roboto font-light text-zinc-700
                gap-4 sm:items-stretch">

        <label for="my-drawer" class="drawer-button sm:hidden w-16 h-[71.2px] flex items-center"><img src="/menu.svg" alt="menu" width="48" height="48"></label>
                
        <NuxtLink to="/" class="w-32 sm:w-[200px] h-[71.2px] sm:h-[71.2px] shrink-0 sm:pl-2 xl:pl-0 sm:flex-shrink-0 flex items-center">
            <img src="/logo-placeholder.png" class="w-32 sm:w-[178px] sm:h-[71.2px]" alt="logo" width="178" height="71.2"/>
        </NuxtLink>

        <div class="justify-start sm:justify-end w-full items-center gap-14 hidden h-[71.2px] sm:flex">
            <NuxtLink
                to="/"
                class="hover:underline underline-offset-4"
                :class="(route.path == '/' || route.path.split('/')[1] == '') ? 'underline hover:decoration-[3px]' : ''"
            >Home</NuxtLink>

            <NuxtLink
                to="/catalog"
                class="hover:underline underline-offset-4"
                :class="route.path == '/catalog' ? 'underline hover:decoration-[3px]' : ''"
            >Catalog</NuxtLink>

            <NuxtLink
                to="/contact"
                class="hover:underline underline-offset-4"
                :class="route.path == '/contact' ? 'underline hover:decoration-[3px]' : ''"
            >Contact</NuxtLink>
        </div>

        <div class="flex flex-row pl-2 mt-[12.1px] gap-4">
            <div class="collapse">
                <input class="absolute" ref="search" aria-label="search button" type="checkbox" @click="(event) => searchClick(event)" />
                <svg class="" xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m39.25 40.3-12.8-12.8q-1.5 1.35-3.475 2.05-1.975.7-3.975.7-4.75 0-8.075-3.3Q7.6 23.65 7.6 18.9q0-4.75 3.3-8.05 3.3-3.3 8.05-3.3 4.75 0 8.075 3.3 3.325 3.3 3.325 8.05 0 2.05-.725 4.025Q28.9 24.9 27.55 26.4L40.4 39.15ZM19 28.7q4.15 0 7-2.825 2.85-2.825 2.85-6.975 0-4.15-2.85-7-2.85-2.85-7-2.85t-7 2.85q-2.85 2.85-2.85 7T12 25.875q2.85 2.825 7 2.825Z"/></svg>
                <div class="collapse-content">
                    <div class="h-12"></div>
                </div>
            </div>
            <LazyCartIcon class="shrink-0 basis-12 sm:basis-auto xl:shrink"/>
        </div>
        <div class="absolute w-full top-[72px] max-w-5xl px-2 flex flex-col items-end">
            <input 
                type="text"
                ref="searchBar"
                placeholder="Search for a product"
                class="input w-full sm:w-[420px] z-20 input-ghost input-bordered rounded-none bg-zinc-50 focus:text-zinc-800 text-zinc-800"
                :class="showBar ? '' : 'hidden' "
                v-model="searchInput">
            <div 
                class="w-full sm:w-[420px] bg-white z-20 border-x border-b"
                :class="(showBar && searchInput) ? '' : 'hidden' "
            >
                <LazySearchContent :query="searchInput" @link="collapseSearch()"/>
            </div>
        </div>
    </div>
</header>
</template>