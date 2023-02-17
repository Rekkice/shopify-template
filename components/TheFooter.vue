<template>
<div class="bottom-0 absolute h-36 w-full">
    <div class="border-t border-slate-300 w-full bg-white py-2 sm:py-0 flex flex-col sm:flex-none h-full">
        <img src="/logo-placeholder.png" class="m-auto sm:hidden pb-2 sm:pb-0" width="211" height="84" alt="logo"/>
        <div class="max-w-5xl m-auto h-full w-full sm:flex sm:items-center">
            <img src="/logo-placeholder.png" class="m-auto hidden sm:block" width="150" height="60" alt="logo"/>
            <div class="h-full sm:w-full sm:m-auto flex flex-col sm:flex-row divide-y 
                        sm:justify-between sm:items-center sm:divide-y-0 gap-2 sm:gap-0 divide-slate-100 text-slate-800">
    
                <div class="border-l border-slate-100 py-4 hidden sm:block ml-16"></div>
                <NuxtLink to="/tos" class="font-poppins px-8 sm:px-16">Terms of service</NuxtLink>
            </div>
        </div>
    </div>
</div>
</template>