<script setup lang="ts">
     import { useRoute } from 'vue-router';
     import Toaster from '@/components/ui/toast/Toaster.vue';
     import Header from '@/components/layouts/Header.vue';
     import Footer from '@/components/layouts/Footer.vue';

     const route = useRoute();

</script>

<template>
     <div class="min-h-[100svh] flex flex-col">
          <Header v-if="!route.meta.hideHeader"/>
               <router-view></router-view>
               
          <Toaster />
          <Footer />
     </div>
</template>