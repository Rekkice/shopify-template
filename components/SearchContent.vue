<script setup>
import { watch } from 'vue';

const props = defineProps({
    query: String,
})

const results = ref('')
const timer = ref(null)
const loading = ref(false)

watch(() => props.query, async (newQuery) => {
    if (props.query.len < 4) return
    loading.value = true
    if (timer.value != null) {
        clearTimeout(timer.value)
    }
    
    timer.value = setTimeout(async () => {
        handleResults(await GqlSearchProducts({query: "title:"+ newQuery + "*"}))
    }, 500)
})

const handleResults = (res) => {
    if (res.products.edges.length == 0) results.value = "No results"
    else {
        results.value = res
    }
    loading.value = false
}

const emit = defineEmits(["link"])

const linkClick = () => {
    emit("link")
}

</script>

<template>
    <div class="">
        
        <div role="status" class="w-full flex justify-center py-4" :class="loading ? '' : 'hidden'">
            <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin fill-zinc-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
        </div>

        <div :class="loading ? 'hidden' : ''" v-if="!loading && results.products">
            <div v-for="product in results.products.edges" class="group hover:bg-zinc-100">
                <NuxtLink @click="linkClick()" class="h-full w-full group py-2 px-4 text-sm text-zinc-600 flex items-center gap-4" :to="'/product/' + product.node.handle">
                    <img :src="product.node.images.edges[0].node.searchUrl" width="50" height="50" :alt="product.node.title">
                    <p class="group-hover:underline underline-offset-2">
                        {{ product.node.title }}
                    </p>
                </NuxtLink>
            </div>
        </div>

        <div v-if="!results.products & !loading" class="p-4">
            No results
        </div>
    </div>
</template>