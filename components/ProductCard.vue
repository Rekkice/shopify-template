<script setup>
import { useCartsStore } from '../stores/cart';

const props = defineProps({
    product: Object,
    index: Boolean
})
const store = useCartsStore()
const buttonLoading = ref(false)
const variant = ref(props.product.variants.edges[0].node)
const cartClick = async () => {
    if (buttonLoading.value) return
    buttonLoading.value = true
    await store.addToCart(variant.value.id, 1)
    buttonLoading.value = false
}

// console.log(props.product)

</script>

<template>

<div class="bg-white max-w-xs lg:max-w-xl h-full p-2.5 flex flex-col justify-start group">
    <NuxtLink :to="'/product/' + product.handle">
        <img :src="product.images.edges[0].node.cardUrl" :alt="product.title" class="object-cover" width="300" height="300" style="aspect-ratio: 1 / 1; width: 100%;"/>
    </NuxtLink>
    <div class="flex flex-col text-zinc-800 justify-start gap-1 py-3 xl:py-4 min-h-[4rem] grow">
        <NuxtLink :to="'/product/' + product.handle">
            <p class="text-base font-poppins group-hover:underline underline-offset-4">{{ product.title }}</p>
        </NuxtLink>
        <div class="flex justify-between">
            <p class="text-base text-zinc-500 font-poppins">$ {{ variant.price.amount }} {{ variant.price.currencyCode }}</p>
            <select name="Variant" v-if="product.variants.edges.length > 1" v-model="variant">
                <option v-for="variant in product.variants.edges" :value="variant.node">{{ variant.node.title }}</option>
            </select>

        </div>
    </div>
    <button
        class="btn btn-primary btn-outline rounded-none" 
        :class="(index ? 'hidden ' : ' ') + (buttonLoading ? 'loading ' : ' ') + ((store.isInCart(variant.id) || !product.availableForSale) ? 'btn-disabled' : '')"
        @click="cartClick()"
    >
        <div v-if="!buttonLoading">
            <p v-if="store.isInCart(variant.id)">In cart</p>
            <p v-else-if="!product.availableForSale">Not available</p>
            <p v-else>Add to cart</p>
        </div>
    </button>
</div>

</template>