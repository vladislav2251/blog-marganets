<script setup lang="ts">
     import { ref } from 'vue';
     import authService from '@/services/authService';
     
     import { useToast } from '@/components/ui/toast/use-toast'
     import { useRouter } from 'vue-router';
     import { Button } from '@/components/ui/button';
     import { Input } from '@/components/ui/input';
     import { Label } from '@/components/ui/label';
     import { cn } from '@/lib/utils';

     const { toast } = useToast();
     const router = useRouter();

     const isLoading = ref(false);

     const email = ref('');
     const password = ref('');

     async function onSubmit(event:Event) {
          event.preventDefault();
          isLoading.value = true;

          try {

               const userInfo = {
                    email: email.value,
                    password: password.value,
                    avatar: 'https://avatars.githubusercontent.com/u/111369356?v=4',
               };

               await authService.login(userInfo);

               toast({
                    title: `${localStorage.getItem("name")} - Автентифікація успішна 🎉`,
                    description: "Щиро вітаю! Ви успішно пройшли автентифікацію та отримали доступ до свого облікового запису. Насолоджуйтесь вивченням нашої платформи!",
               });

               router.push("/");

          } catch (err) {
               throw err;
          } finally {
               isLoading.value = false;
          };
     };

     async function onSubmitGoogle(event:Event) {
          event.preventDefault();
          isLoading.value = true;

          try {

               await authService.googleSignIn();

          } catch (err) {
               throw err;
          } finally {
               isLoading.value = false;
          };
     };

</script>

<template>
     <div :class="cn('grid gap-6', $attrs.class ?? '')">
          <form @submit="onSubmit">
               <div class="grid gap-2">
                    <div class="grid gap-1">
                         <Label class="sr-only" for="email">
                              Email
                         </Label>
                         <Input
                              id="email"
                              v-model="email"
                              placeholder="Ваша Ел.пошта"
                              type="email"
                              auto-capitalize="none"
                              auto-complete="email"
                              auto-correct="off"
                              :disabled="isLoading"
                         />
                         <Input
                              v-model="password"
                              id="password"
                              placeholder="Ваш пароль"
                              type="password"
                              auto-capitalize="none"
                              auto-correct="off"
                              required
                              :disabled="isLoading"
                         />
                    </div>

                    <Button :disabled="isLoading">
                         <svg viewBox="0 0 24 24" width="1.2em" height="1.2em" v-if="isLoading" class="mr-2 h-4 w-4 animate-spin">
                              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                         </svg>
                         Увійдіть за допомогою ел.пошти
                    </Button>
               </div>
          </form>
          <div class="relative">
               <div class="absolute inset-0 flex items-center">
                    <span class="w-full border-t" />
               </div>
               <div class="relative flex justify-center text-xs uppercase">
                    <span class="bg-background px-2 text-muted-foreground">
                         АБО ПРОДОВЖИТИ З
                    </span>
               </div>
          </div>
          
          <Button variant="outline" type="button" :disabled="isLoading" @click="onSubmitGoogle">
               <svg viewBox="0 0 24 24" width="1.2em" height="1.2em" v-if="isLoading" class="mr-2 h-4 w-4 animate-spin">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 1 1-6.219-8.56"></path>
               </svg>

               <img class="w-4 h-4 mr-2" width="16" height="16" src="/svg/google.svg" v-else>
               
               Google
          </Button>
     </div>
</template>