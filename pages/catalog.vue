<script setup>

useHead({
  title: 'Catalog | Brand',
  meta: [
    { name: 'description', content: 'Catalog.' }
  ]
})

const productsPerPage = 12

const { data } = await useAsyncData('products', () => GqlGetProducts({ numProducts: productsPerPage }))
const { collections } = await GqlGetCollections()
const hasMoreProducts = ref(data.value.products.pageInfo.hasNextPage)
const handle = ref("all")

async function fetchData(newHandle) {
    handle.value = newHandle
    if (handle.value == "all") {
        data.value = await GqlGetProducts({ numProducts: productsPerPage })
        hasMoreProducts.value = data.value.products.pageInfo.hasNextPage
        return
    }
    const newValue = await GqlGetProductsFromCollection({ numProducts: productsPerPage, handle: handle.value})
    data.value.products.edges = newValue.collection.products.edges
    hasMoreProducts.value = newValue.collection.products.pageInfo.hasNextPage
}

async function loadMore() {
    let newData = null
    if (handle.value == "all") {
        newData = (await GqlGetProducts(
        { 
            numProducts: productsPerPage,
            cursorNext: data.value.products.pageInfo.endCursor
        })).products
    } else {
        newData = (await GqlGetProductsFromCollection(
            { 
                numProducts: productsPerPage, 
                handle: handle.value,
                cursorNext: data.value.products.pageInfo.endCursor
            })).collection.products
        newData.edges = newData.edges.filter(product => product.node.availableForSale == true)
    }
    data.value.products.edges = data.value.products.edges.concat(newData.edges)
    data.value.products.pageInfo = newData.pageInfo
    hasMoreProducts.value = data.value.products.pageInfo.hasNextPage
}
</script>

<template>
    <div class="my-4">
        <p class="w-full max-w-5xl m-auto pl-2 text-zinc-600 text-sm">
            Filter:
        </p> 
        <div class="w-full max-w-5xl min-h-[3rem] m-auto flex justify-between items-center text-zinc-800 px-16">
            <div class="flex justify-center">
                <button @click="fetchData('all')" class="border-b border-slate-300 hover:border-zinc-800">All</button>
            </div>
            <p v-for="collection in collections.edges" class="flex justify-center">
                <button @click="fetchData(collection.node.handle)" class="border-b border-slate-300 hover:border-zinc-800"> {{ collection.node.title }} </button>
            </p>
        </div>
    </div>

    <TheProductsView :data="data.products"/>

    <div v-if="hasMoreProducts" class="max-w-5xl m-auto mb-8 px-2 w-full">
        <button class="btn btn-primary text-white btn-block mt-2 rounded-none"
        @click="loadMore()"
        >Load more</button>
    </div>
</template>