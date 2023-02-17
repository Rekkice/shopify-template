<script setup>

import { useCartsStore } from "../stores/cart"

useHead({
  title: 'Cart | Brand',
  meta: [
    { name: 'description', content: 'Cart.' }
  ]
})

const store = useCartsStore()
const total = ref(null)

onMounted(async () => {
    total.value = store.cart ? store.cart.cost.totalAmount.amount : 0
})

function checkout() {
    const url = store.cart.checkoutUrl
    store.clearCart()
    if (process.client) {
        window.location = url
    }
}

function getProducts() {
    if (store.cart == null) return []
    return store.cart.lines.nodes
}

function priceUpdate(newPrice) {
    total.value = newPrice.price
    store.updateCount(newPrice.count)
}

async function refresh(cart) {
    store.cart = cart
}
</script>

<template>
    <section class="max-w-5xl m-auto pt-12 pb-4">
        <div class="flex justify-between px-4 lg:px-0">
            <h1 class="text-xl lg:text-3xl text-zinc-800 font-poppins">Your cart <span class="text-base lg:text-2xl text-zinc-600">({{ store.count }})</span></h1>
            <a href="/catalog" class="text-sm lg:text-lg text-zinc-600 my-auto border-b-2 border-zinc-600">Continue shopping</a>
        </div>
    </section>
    <div class="flex flex-col grid grid-cols-8 xl:grid-cols-12 max-w-5xl mx-auto gap-2 w-full mb-4 px-4 lg:px-0">
        <p class="col-start-1 text-zinc-500 uppercase text-sm">Product</p>
        <p class="col-start-5 text-zinc-500 uppercase hidden sm:block text-sm">Quantity</p>
        <p class="col-start-8 text-zinc-500 uppercase text-sm">Total</p>
        <div class="col-span-12 xl:col-span-9">
            <hr>
        </div>
        
    </div>
    <div class="flex flex-col xl:grid grid-cols-1 sm:grid-cols-12 max-w-5xl m-auto gap-2 w-full mb-16 px-4 lg:px-0">


        <section class="bg-white text-zinc-800
        col-start-1 col-end-9
        border-b border-slate-1 200 py-2"
        v-for="product in getProducts()">
            <CartProductCard 
                :product="product" 
                :cartId="store.cart.id" 
                @priceChange="(price) => priceUpdate(price)"
                @removed="(cart) => refresh(cart)"
            />
        </section>

        <section 
            class="col-start-9 col-end-13 
                   bg-white flex flex-col justify-between min-h-[10rem] xl:pl-4"
        >
            <div class="flex text-xl justify-between pt-2">
                <h1 class="text-zinc-800">Subtotal: </h1>
                <h1 class="text-zinc-600 text-poppins">
                    $ {{ store.cart ? total : " " }}
                </h1>
            </div>

            <p class="text-zinc-500 text-xs">Taxes and shipping calculated at check out</p>

            <button
                @click="checkout()"
                class="btn btn-primary rounded-none"
                :class="(total == 0 || total == null) ? 'btn-disabled' : ''"
            >
                <p class="">
                    Check out
                </p>
            </button>
        </section>

    </div>
</template>