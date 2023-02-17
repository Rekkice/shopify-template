<script setup>
const props = defineProps(["images"])
const imgIndex = ref(0)
const transition = ref(null)

function next() {
    transition.value = "slide-next"
    imgIndex.value++
    if (imgIndex.value >= props.images.length) imgIndex.value = 0
}
function previous() {
    transition.value = "slide-prev"
    imgIndex.value--
    if (imgIndex.value < 0) imgIndex.value = props.images.length - 1
}

</script>

<template>
<div>
  <div class="w-full relative sm:sticky sm:top-0" v-if="images.length > 1">
    <Transition :name="transition" mode="out-in">
        <img :src="images[imgIndex].node.pageUrl" 
            :key="images[imgIndex].node.pageUrl"
            class="mr-0 object-cover" 
            alt="Imagen de producto" 
            width="600" 
            height="600"
            style="aspect-ratio: 1 / 1;"
        />
    </Transition>
    <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <button @click="previous()" class="btn px-5 rounded-none opacity-70">❮</button>
        <button @click="next()" class="btn px-5 rounded-none opacity-70">❯</button>
    </div>
  </div>

  <div class="w-full" v-else>
    <img :src="images[0].node.pageUrl" alt="Imagen de producto" width="600" height="600" class="object-cover" style="aspect-ratio: 1 / 1;"/>
  </div>
</div>
</template>

<style>
.slide-next-enter-active,
.slide-next-leave-active {
  transition: all 0.25s ease-out;
}
.slide-next-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.slide-next-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: all 0.25s ease-out;
}
.slide-prev-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.slide-prev-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>