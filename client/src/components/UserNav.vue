<template>
     <DropdownMenu>
          <DropdownMenuTrigger as-child="">
               <Button variant="ghost" class="relative h-8 w-8 rounded-full">
                    
                    <Avatar class="h-8 w-8" v-if="avatarItem()">
                         <AvatarImage :src="avatarItem()" alt="avatar"/>
                         <AvatarFallback>{{ getShortName() }}</AvatarFallback>
                    </Avatar>


               </Button>

               <Button @click="pushLogin" v-if="!avatarItem()">Sign In</Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent class="w-56" align="end">
               <DropdownMenuLabel class="font-normal flex">
                    <div class="flex flex-col space-y-1">
                         <p class="text-sm font-medium leading-none">Artur</p>
                         <p class="text-sm leading-none text-muted-foreground">dotsenk20034@gmail.com</p>
                    </div>
               </DropdownMenuLabel>

               <DropdownMenuSeparator />

               <DropdownMenuGroup>
                    <DropdownMenuItem>
                         Profile
                         </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                         Log out
                    </DropdownMenuItem>
               </DropdownMenuContent>
          </DropdownMenu>
</template>

<script setup lang="ts">
     import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
     import { Button } from '@/components/ui/button';
     import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
     import { useRouter } from 'vue-router';

     const router = useRouter();

     const pushLogin = () => {
          router.push({ name: "SignIn" });
     };

     const avatarItem = () => {
          return localStorage.getItem("avatar");
     };

     const getShortName = () => {
          let fullName = "Artur Aotsenk";
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

</script>