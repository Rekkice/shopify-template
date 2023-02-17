<script setup>
import { watch } from 'vue';

const props = defineProps({
    product: Object,
    cartId: String,
})

// console.log(props.product)

const emit = defineEmits(["priceChange", "removed"])

const total = ref(props.product.cost.totalAmount.amount)
const inputQuantity = ref(props.product.quantity)

const addDisabled = computed(() => {
    return !(props.product.quantity < props.product.merchandise.quantityAvailable)
})

const subtractDisabled = computed(() => {
    return !(props.product.quantity > 1)
})

async function add() {
    if (props.product.quantity >= props.product.merchandise.quantityAvailable) return
    setQuantity(props.product.quantity + 1)
}

async function subtract() {
    if (props.product.quantity <= 1) return
    setQuantity(props.product.quantity - 1)
}

async function setQuantity(newValue) {
    const price = await GqlChangeLineQuantity({
        cartId: props.cartId,
        lineId: props.product.id, 
        quantity: newValue,
        attributes: props.product.attributes,
    })

    const newNode = price.cartLinesUpdate.cart.lines.nodes.filter(node => node.id == props.product.id)[0]

    emit("priceChange", {
        price: price.cartLinesUpdate.cart.cost.totalAmount.amount, 
        count: price.cartLinesUpdate.cart.totalQuantity
    })

    props.product.quantity = newNode.quantity
    total.value = newNode.cost.totalAmount.amount
}

async function remove() {
    const price = await GqlRemoveLineFromCart({cartId: props.cartId, lineId: props.product.id})
    emit("priceChange", {
        price: price.cartLinesRemove.cart.cost.totalAmount.amount,
        count: price.cartLinesRemove.cart.totalQuantity
    })
    emit("removed", price.cartLinesRemove.cart)
}

watch(() => props.product.quantity, async (newQuantity, oldQuantity) => {
    if (newQuantity == 0) remove()
    inputQuantity.value = newQuantity
})

watch(inputQuantity, async (newQuantity, oldQuantity) => {
    if (newQuantity == props.product.quantity) return
    if (newQuantity == 0 || newQuantity < 0) {
        inputQuantity.value = 1
        return
    }
    setQuantity(newQuantity)
})


</script>

<template>
    <div class="h-full">
        <div class="grid grid-cols-4 sm:grid-cols-8 h-full gap-2">
            <NuxtLink :aria-label="props.product.merchandise.product.title" class="col-start-1 sm:col-span-2 flex flex-col sm:flex-row items-center gap-4" :to="'/product/' + props.product.merchandise.product.handle">
                <img :src="product.merchandise.product.images.edges[0].node.cartUrl" :alt="props.product.merchandise.product.title" class="object-cover w-24 sm:w-[140px]" style="aspect-ratio: 1 / 1;"/>
            </NuxtLink>

            <NuxtLink class="flex flex-col col-start-2 sm:col-start-3 col-span-2 my-auto group" :to="'/product/' + props.product.merchandise.product.handle">
                    <h4 class="text-zinc-500 font-poppins text-xs" v-if="product.merchandise.title != 'Default Title'">{{ product.merchandise.title }}</h4>
                    <h2 class="text-zinc-600 font-poppins text-sm group-hover:underline underline-offset-4">{{ product.merchandise.product.title }}</h2>
                    <h3 class="text-zinc-500 font-poppins text-sm">$ {{ product.merchandise.price.amount }} {{ product.cost.totalAmount.currencyCode }}</h3>
            </NuxtLink>

            <div class="col-start-2 mx-auto sm:mx-0 sm:col-start-5 col-span-2 form-control justify-start">
                <div class="rounded-none border border-slate-600 w-fit my-auto">
                    <button
                        class="btn btn-outline rounded-none border-none text-zinc-500 disabled:bg-slate-50 w-12" 
                        :disabled="subtractDisabled"
                        @click="subtract"
                    >-</button>
    
                    <input type="number" aria-label="quantity" class="input w-12 rounded-none border-none text-center px-0 input-bordered bg-white text-zinc-500" v-model="inputQuantity">
        
                    <button 
                        class="btn btn-outline rounded-none border-none text-zinc-500 disabled:bg-slate-50 w-12" 
                        :disabled="addDisabled"
                        @click="add"
                    >+</button>
                </div>
            </div>
            <button class="pr-8 col-start-4 sm:col-start-7 m-auto"
                aria-label="remove product"
                @click="remove()"
            >
                <svg class="w-8 h-8 fill-zinc-500" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"><path d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z"/></svg>
            </button>
            <div class="col-start-4 row-start-1 sm:col-start-8 flex items-center justify-end pr-4 sm:justify-start sm:pr-0 gap-4">
                <h2 class="text-zinc-600 font-poppins text-sm">$ {{ total }} {{ product.cost.totalAmount.currencyCode }}</h2>
            </div>
        </div>
    </div>
</template>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
}


</style>