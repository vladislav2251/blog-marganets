<template>
  <DropdownMenu v-if="avatarItem()">
    <DropdownMenuTrigger as-child="">
      <Button variant="ghost" class="relative h-8 w-8 rounded-full">
        <Avatar class="h-8 w-8">
          <AvatarImage :src="avatarItem()" alt="avatar" />
          <AvatarFallback>{{ getShortName() }}</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
   
    <DropdownMenuContent class="w-56" align="end">
        <DropdownMenuLabel class="font-normal flex">
          <div class="flex flex-col space-y-1">
            <p class="text-sm font-medium leading-none">{{ name }}</p>
            <p class="text-sm leading-none text-muted-foreground">{{ email }}</p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
    
        <DropdownMenuGroup>
          <DropdownMenuItem @click="pushProfile">Профіль</DropdownMenuItem>
        </DropdownMenuGroup>
    
        <DropdownMenuSeparator />
   
      <DropdownMenuItem @click="logoutUser">Вийти</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
   
  <Button @click="pushLogin" v-else>
    Увійти
  </Button>
</template>
   

<script setup lang="ts">
     import { ref, onMounted } from 'vue';
     import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
     import { Button } from '@/components/ui/button';
     import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
     import { useRouter } from 'vue-router';

     import userService from '@/services/userService';
     import authService from '@/services/authService';

     const router = useRouter();

     const name = ref('');
     const email = ref('');

     const pushLogin = () => {
          router.push({ name: "SignIn" });
     };

     const pushProfile = () => {
          router.push({ name: "Profile" });
     };

     const avatarItem = () => {
          return localStorage.getItem("avatar");
     };

    const logoutUser = async () => {

      await authService.signOut();

      window.location.reload();
      router.push("/");
    };

    const getShortName = () => {
        let fullName = localStorage.getItem("name");
        if (fullName) {
              const initials = fullName
                  .split(' ')
                  .map(word => word.charAt(0))
                  .join('');

              return initials;
        } else {
              return '';
        };
    };

    onMounted(async () => {
        const response = await userService.getMeAccount();
        
        email.value = response.user.email;
        name.value = localStorage.getItem("name") as string;
    });

</script>