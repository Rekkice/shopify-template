<script setup>

useHead({
  title: 'Home Page | Brand',
  meta: [
    { name: 'description', content: 'Index descriptionnnnn.' },
    { content: 'https://cdn.discordapp.com/emojis/718297438565302272.png', property: 'og:image' },
    { content: 'Embed title', property: 'og:title' },
    { content: 'Embed description.', property: 'og:description' }
  ]
})

const { data } = await useAsyncData('products', () => GqlGetProducts({ numProducts: 8 }))

</script>

<template>

    <div class="hero min-h-screen bg-[url(https://cdn.shopify.com/s/files/1/0711/6842/6260/files/hangers-gba51f4953_1920_640x750_crop_center.jpg?v=1674777397)] sm:bg-[url(https://cdn.shopify.com/s/files/1/0711/6842/6260/files/hangers-gba51f4953_1920.jpg?v=1674777397)]">
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center">
            <div class="max-w-md text-white">
                <h1 class="mb-5 text-5xl font-bold">Hello there</h1>
                <p class="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                <NuxtLink class="btn btn-secondary btn-outline rounded-none" to="/catalog">Shop all</NuxtLink>
            </div>
        </div>
    </div>

    <section class="p-16 text-center max-w-4xl m-auto">
        <h1 class="text-4xl text-zinc-800 mb-8">Talk about your brand</h1>
        <h2 class="text-base text-zinc-500">
            Share information about your brand with your customers. Describe a product, make announcements, or welcome customers to your store.
        </h2>
    </section>

    <section class="text-left m-auto w-full">
        <LazyTheIndexProductsView :data="data.products"/>
    </section>

</template>