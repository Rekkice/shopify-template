<script setup>
import { useCartsStore } from "../stores/cart"

const store = useCartsStore()
// store.clearCart()
// console.log(store.cart)

useHead({
  title: 'Contact | Brand',
  meta: [
    { name: 'description', content: 'Contact information.' }
  ]
})

const { page } = await GqlGetPage({handle: "contact"})

// if (page.seo.title) {
//     useHead({
//         title: page.seo.title,
//         meta: [
//             { name: "description", content: page.seo.description }
//         ]
//     })
// }

// console.log(page)

</script>

<template>

<section class="lg:max-w-5xl m-auto px-4 py-8 lg:px-0">
    <h1 class="text-zinc-800 text-5xl font-poppins py-4">
        {{ page.title }}
    </h1>
    <div class="text-zinc-600" v-html="page.body">

    </div>
</section>

</template>