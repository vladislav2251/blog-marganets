<template>
     <div class="min-h-screen">
          <div class="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:px-0">
               <Button as-child class="absolute font-medium text-sm left-8 top-8" variant="ghost">
                    <router-link to="/register">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4">
                              <polyline points="15 18 9 12 15 6"></polyline>
                         </svg>

                         Back
                    </router-link>
               </Button>

               <router-link class="absolute font-medium text-sm right-8 top-8" to="/">
                    <img class="rounded-lg" width="40" height="40" src="/img/marganets-lichey-logo.png" alt="logo">
               </router-link>
               
               <div class="lg:p-8">
                    <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                         <div class="flex flex-col space-y-2 text-center">
                              <h1 class="text-2xl font-semibold tracking-tighter">Welcome back</h1>

                              <p class="text-sm text-muted-foreground">Enter your email to sign in to your account</p>
                         </div>

                         <SignInAuthForm />

                         <p class="px-8 text-center text-sm text-muted-foreground">
                              <a class="hover:text-brand underline underline-offset-4" href="/register">
                                   Don't have an account? Sign Up
                              </a>
                         </p>
                    </div>
               </div>
          </div>
     </div>
</template>

<script setup lang="ts">
     import { Button } from '@/components/ui/button';
     import SignInAuthForm from '@/components/SignInAuthForm.vue';
</script>