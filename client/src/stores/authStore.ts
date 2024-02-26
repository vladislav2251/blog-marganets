import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authStore', {
     state: () => ({
          role: null as string | null,
          avatar: null as string | null,
          name: null as string | null,
     }),

     actions: {
          async register(role: string, avatar: string, name: string) {
               try {
                    console.log(role);
                    
                    this.name = name;
                    this.role = role;
                    this.avatar = avatar;

                    localStorage.setItem('name', this.name);
                    localStorage.setItem('role', this.role);
                    localStorage.setItem('avatar', this.avatar);

               } catch (err) {
                    console.log(err);
               };
          },

          async login(role: string, avatar: string, name: string) {
               try {

                    this.name = name;
                    this.role = role;
                    this.avatar = avatar;

                    localStorage.setItem('name', this.name);
                    localStorage.setItem('role', this.role);
                    localStorage.setItem('avatar', this.avatar);
                    
               } catch (err) {
                    console.log(err);
               };
          },

          async googleSignIn(role: string, avatar: string) {
               try {

                    this.role = role;
                    this.avatar = avatar;

                    localStorage.setItem('role', this.role);
                    localStorage.setItem('avatar', this.avatar);

               } catch (err) {
                    console.log(err);
               };
          },

          async signOut() {

               this.role = null;
               this.avatar = null;

               localStorage.removeItem('name');
               localStorage.removeItem('role');
               localStorage.removeItem('avatar');

          },

     }
});
