<script setup>
const props = defineProps(["data"])
</script>

<template>

<div class="flex justify-between max-w-5xl xl:max-w-7xl m-auto">
    <div class="grid m-auto
    grid-cols-2
    sm:grid-cols-2
    lg:grid-cols-3
    xl:grid-cols-4
    gap-2"
    >
        <div v-if="data.edges" v-for="product in data.edges">
            <ProductCard :product="product.node" :index="false" />
        </div>
        <div v-else class="m-auto text-xl font-poppins col-span-4">
            No products found
        </div>
    </div>
</div>


</template>