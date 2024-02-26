<template>
     <main class="flex-1 flex justify-center items-center">
          <Tabs default-value="account" class="w-[400px]">
               <TabsList class="grid w-full grid-cols-2">
                    <TabsTrigger value="account">
                         Account
                    </TabsTrigger>
                    <TabsTrigger value="password">
                         Password
                    </TabsTrigger>
               </TabsList>
               <TabsContent value="account">
                    <Card>
                         <CardHeader class="flex gap-4 flex-row">
                              
                              <div>
                                   <Avatar class="cursor-pointer" @click="handleAvatarClick">
                                        <AvatarImage :src="avatar" />
                                        <AvatarFallback>AA</AvatarFallback>
                                   </Avatar>

                                   <input type="file" style="display: none;" id="avatarInput" @change="handleFileChange" />
                              </div>

                              <div>
                                   <CardTitle>Account</CardTitle>
                                   <CardDescription>
                                        Make changes to your account here. Click save when you're done.
                                   </CardDescription>
                              </div>
                         </CardHeader>
                         <CardContent class="space-y-2">
                              <div class="space-y-1">
                                   <Label for="name">Name</Label>
                                   <Input id="name" :value="userInfo?.user?.name" />
                              </div>
                         </CardContent>

                         <CardFooter>
                              <Button>Save changes</Button>
                         </CardFooter>
                    </Card>
               </TabsContent>

               <TabsContent value="password">
                    <Card>
                         <CardHeader>
                              <CardTitle>Password</CardTitle>
                              <CardDescription>
                                   Change your password here. After saving, you'll be logged out.
                              </CardDescription>
                         </CardHeader>
                         <CardContent class="space-y-2">
                              <div class="space-y-1">
                                   <Label for="current">Current password</Label>
                                   <Input id="current" type="password" />
                              </div>
                              <div class="space-y-1">
                                   <Label for="new">New password</Label>
                                   <Input id="new" type="password" />
                              </div>
                         </CardContent>
                         <CardFooter>
                              <Button>Save password</Button>
                         </CardFooter>
                    </Card>
               </TabsContent>
          </Tabs>
     </main>
</template>

<script setup lang="ts">
     import { ref, onMounted } from 'vue';
     import { Button } from '@/components/ui/button'
     import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
     import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
     import { Input } from '@/components/ui/input'
     import { Label } from '@/components/ui/label'
     import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
     import userService from '@/services/userService';

     const userInfo = ref<UserInfo | null>();
     const avatar = ref('');

     interface UserInfo {
          user: {
               name: string;
          };
     }

     const handleAvatarClick = () => {
          const input = document.getElementById('avatarInput');
          input?.click();
     };

     const handleFileChange = (event: Event) => {
          const target = event.target as HTMLInputElement;
          const file = target.files?.[0];

          if (file) {
               const reader = new FileReader();
               reader.onload = () => {
                    avatar.value = reader.result as string;
               };

               reader.readAsDataURL(file);
          };
     };

     onMounted(async () => {
          userInfo.value = await userService.getMeAccount();
     });
</script>