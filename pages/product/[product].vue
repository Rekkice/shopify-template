<script setup>

import { useCartsStore } from "../../stores/cart"

const store = useCartsStore()

const route = useRoute()
const router = useRouter()

const { product } = await GqlGetProduct({handle: route.params.product})
const variant = ref(product.variants.edges[0].node)

// console.log(product)

useHead({
    title: product.title + " | Brand",
    meta: [
        { name: 'description', content: product.description },
        { content: product.images.edges[0].node.pageUrl, property: 'og:image' },
        { content: product.title + " in Brand", property: 'og:title' },
        { content: product.description, property: 'og:description' },
        { name: "twitter:card", content: "summary_large_image" }
    ]
})

const share = () => {
    if (process.client) {
        navigator.share({
            title: product.title,
            url: route.fullPath
        })
    }
}

const quantity = ref(1)

onMounted(async () => {
    if (!route.params.product) router.push("/catalog")
})

async function addToCart() {
    if (buttonLoading.value) return
    buttonLoading.value = true
    await store.addToCart(variant.value.id, quantity.value)
    buttonLoading.value = false
    sendAlert("Succesfully added to cart!")
}

const alertVisible = ref(false)
const alertText = ref("")
function sendAlert(text) {
    alertText.value = text
    alertVisible.value = true
    setTimeout(() => {
        alertVisible.value = false
    }, 5000)
}

const buttonLoading = ref(false)

const addDisabled = computed(() => {
    return !(quantity.value < product.totalInventory)
})

const subtractDisabled = computed(() => {
    return !(quantity.value > 1)
})

async function add() {
    if (quantity.value >= product.totalInventory) return
    quantity.value++
}

async function subtract() {
    if (quantity.value <= 1) return
    quantity.value--
}

watch(quantity, async (newQuantity, oldQuantity) => {
    if (newQuantity > product.totalInventory) quantity.value = product.totalInventory
})

const buyButton = async () => {
    const lines = {
        merchandiseId: variant.value.id,
        quantity: quantity.value,
    }
    const checkoutUrl = (await GqlCreateBuyCart({ lines: lines })).cartCreate.cart.checkoutUrl
    if (process.client) {
        window.location = checkoutUrl
    }
}

</script>

<template>

<div class="z-10 fixed w-full">
    <Transition class="mx-auto" name="scale">
        <div class="alert alert-success shadow-lg max-w-sm rounded-none" v-if="alertVisible">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{{ alertText }}</span>
          </div>
        </div>
    </Transition>
</div>

<section class="max-w-5xl xl:max-w-7xl m-auto p-1 py-2 bg-white px-8">

    <button @click="router.back()" class="flex items-center mb-2 w-fit">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M10 21.3.7 12 10 2.7l1.075 1.05L2.825 12l8.25 8.25Z"/></svg>
        <p class="font-roboto font-medium text-zinc-800">Go back</p>
    </button>

    <div class="flex gap-4 flex-col sm:flex-row">

        <ProductCarousel :images="product.images.edges" class="xl:basis-[600px] shrink xl:shrink-0"/>
        <section class="shrink basis-4/5 sm:pl-4 border-slate-300 text-zinc-800 flex flex-col">

            <div class="mb-3">
                <h1 class="text-3xl font-poppins text-zinc-800">{{ product.title }}</h1>
            </div>
            
            <div class="flex justify-between">
                <h2 class="text-xl text-zinc-700 font-poppins py-4">$ {{ variant.price.amount }} {{ variant.price.currencyCode }}</h2>
                <button class="btn border-black text-black btn-outline rounded-none" @click="share()">
                    <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="M30.083 35.833q-1.708 0-2.895-1.187Q26 33.458 26 31.75q0-.333.062-.729.063-.396.188-.729l-13.167-7.75q-.583.708-1.416 1.125-.834.416-1.75.416-1.709 0-2.896-1.187Q5.833 21.708 5.833 20t1.188-2.896q1.187-1.187 2.896-1.187.916 0 1.75.395.833.396 1.416 1.105l13.167-7.75q-.125-.292-.188-.667Q26 8.625 26 8.25q0-1.708 1.188-2.896 1.187-1.187 2.895-1.187 1.709 0 2.896 1.187 1.188 1.188 1.188 2.896t-1.188 2.896q-1.187 1.187-2.896 1.187-.916 0-1.729-.375-.812-.375-1.437-1.083L13.75 18.542q.125.333.188.729.062.396.062.729 0 .333-.062.708-.063.375-.188.709l13.167 7.666q.625-.666 1.416-1.041.792-.375 1.75-.375 1.709 0 2.896 1.166Q34.167 30 34.167 31.75q0 1.708-1.188 2.896-1.187 1.187-2.896 1.187Zm0-24.916q1.125 0 1.896-.792.771-.792.771-1.875 0-1.125-.771-1.896-.771-.771-1.896-.771t-1.895.792q-.771.792-.771 1.875 0 1.125.791 1.896.792.771 1.875.771ZM9.917 22.667q1.125 0 1.895-.792.771-.792.771-1.875 0-1.125-.791-1.896-.792-.771-1.875-.771-1.125 0-1.896.792-.771.792-.771 1.875 0 1.125.792 1.896.791.771 1.875.771Zm20.166 11.75q1.125 0 1.896-.792.771-.792.771-1.875 0-1.125-.771-1.896-.771-.771-1.896-.771t-1.895.792q-.771.792-.771 1.875 0 1.125.791 1.896.792.771 1.875.771Zm0-26.167ZM9.917 20Zm20.166 11.75Z"/></svg>
                    Share
                </button>
            </div>

            <div class="mb-2 flex gap-8">
                <div class="shrink-0">
                    <h3 class="text-base text-zinc-600 py-2">Quantity</h3>
        
                    <div class="rounded-none border border-slate-600 w-fit">
                        <button
                            class="btn btn-outline rounded-none border-none text-zinc-500 disabled:bg-slate-50 w-12" 
                            :disabled="subtractDisabled"
                            @click="subtract"
                        >-</button>
        
                        <input type="number" aria-label="quantity" class="input w-12 rounded-none border-none text-center px-0 input-bordered bg-white text-zinc-500" v-model="quantity">
            
                        <button 
                            class="btn btn-outline rounded-none border-none text-zinc-500 disabled:bg-slate-50 w-12" 
                            :disabled="addDisabled"
                            @click="add"
                        >+</button>
                    </div>
                </div>

                <div class="w-full" :class="(product.variants.edges.length > 1) ? '' : 'hidden'">
                    <h4 class="text-base text-zinc-600 py-2">
                        Variant
                    </h4>
                    <select class="select h-12 w-full select-primary focused:bg-white rounded-none" v-model="variant">
                        <option v-for="variant in product.variants.edges" :value="variant.node">
                            {{ variant.node.title }}
                        </option>
                    </select>
                </div>
                
            </div>
            

            <div class="py-3">

                <p class="text-red-400" v-if="!product.availableForSale">Product not currently available.</p>
                
                <button
                class="btn btn-block btn-primary btn-outline rounded-none mb-2"
                :class="(buttonLoading ? 'loading ' : ' ') + ( (product.availableForSale) ? '' : 'btn-disabled' )"
                @click="addToCart"
                >
                    Add to cart
                </button>

                <a
                class="btn btn-block btn-primary rounded-none"
                @click="buyButton"
                :class="(product.availableForSale) ? '' : 'btn-disabled'"
                >
                    Buy it now
                </a>
            </div>

            <div class="text-zinc-600 py-4" v-html="product.descriptionHtml"></div>

            <div class="collapse collapse-arrow border-t">
                <input type="checkbox" aria-label="collapse materials"/>
                <div class="collapse-title text-base text-zinc-700">
                    Materials
                </div>
                <div class="collapse-content"> 
                    <p class="text-zinc-700 text-sm">{{ product.material ? product.material.value : 'No data found' }}</p>
                </div>
            </div>

            <div class="collapse collapse-arrow border-b border-t">
                <input type="checkbox" aria-label="collapse dimensions" /> 
                <div class="collapse-title text-base text-zinc-700">
                    Dimensions
                </div>
                <div class="collapse-content"> 
                    <p class="text-zinc-700 text-sm">{{ product.dimensions ? product.dimensions.value : 'No data found' }}</p>
                </div>
            </div>

        </section>
    </div>
</section>
</template>

<style>
.canvas-container {margin: auto auto;}

.scale-enter-active {
    -webkit-animation: scale-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: scale-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.scale-leave-active {
    -webkit-animation: scale-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
	        animation: scale-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}

@-webkit-keyframes scale-in-top {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
    -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
    opacity: 1;
  }
}
@keyframes scale-in-top {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
    -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
    opacity: 1;
  }
}

@-webkit-keyframes scale-out-top {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0);
            transform: scale(0);
    -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
    opacity: 1;
  }
}
@keyframes scale-out-top {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0);
            transform: scale(0);
    -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
    opacity: 1;
  }
}


</style>