<template>
     <footer class="container border-t py-6">
          <div class="flex justify-between">
               <div class="flex items-center gap-[12px]">
                    <router-link class="w-[36px] flex items-center justify-center h-[36px] bg-white rounded-[100px]" to="/" v-for="link in linkItems" :key="link.svg">
                         <img :src="link.svg" alt="icons">
                    </router-link>
               </div>

               <router-link to="/">
                    <img class="rounded-[10px]" width="40" height="40" src="/img/branding-school.png" alt="logo">
               </router-link>

          </div>
     </footer>
</template>

<script setup lang="ts">
     import { ref } from 'vue';

     const linkItems = ref([
          { svg: "/icons/facebook.svg" },
          { svg: "/icons/main.svg" },
          { svg: "/icons/novi-znania.svg" },
     ]);


</script>