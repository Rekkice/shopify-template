<script setup>
useHead({
    link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
})
</script>

<template>
  <div class="bg-white min-h-screen" data-theme="template">
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

::-moz-selection { /* Code for Firefox */
    color: inherit;
    background: rgb(187, 187, 187);
}

::selection {
    color: inherit;
    background: rgb(187, 187, 187);
}
</style>