<script setup>
const props = defineProps(["data"])
</script>

<template>
<div>
    <h1 class="m-auto text-2xl text-zinc-800 mb-6 max-w-[648px] sm:max-w-5xl xl:max-w-7xl pl-2.5">
        Featured products
    </h1>
    <div class="flex justify-between max-w-5xl xl:max-w-7xl m-auto">
        <div class="grid m-auto
        grid-cols-2
        sm:grid-cols-4
        gap-2"
        >
            <div v-if="data.edges" v-for="product in data.edges">
                <ProductCard :product="product.node" :index="true"/>
            </div>
            <div v-else class="m-auto text-xl font-poppins col-span-4">
                No products found
            </div>
        </div>
    </div>
    <div class="m-auto w-fit mb-20">
        <NuxtLink class="btn rounded-none px-10 text-zinc-100" to="/catalog">
            View all
        </NuxtLink>
    </div>
</div>


</template>