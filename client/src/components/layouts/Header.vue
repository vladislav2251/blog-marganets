<template>
     <div class="border-b">
          <div class="flex h-16 justify-between">
               <MainNav class="mx-6 hidden sm:flex"/>

               <div class="ml-auto flex items-center mr-6 space-x-4">
                    <UserNav />
               </div>
          </div>
     </div>
</template>

<script setup lang="ts">
     import MainNav from '@/components/MainNav.vue';
     import UserNav from '@/components/UserNav.vue';
</script>