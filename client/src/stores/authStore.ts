import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authStore', {
     state: () => ({
          token: null as string | null,
          role: null as string | null,
          avatar: null as string | null,
     }),

     actions: {
          async register(token: string, role: string, avatar: string) {
               try {
                    console.log(role);
                    
                    this.token = token;
                    this.role = role;
                    this.avatar = avatar;

                    localStorage.setItem('auth_token', this.token);
                    localStorage.setItem('role', this.role);
                    localStorage.setItem('avatar', this.avatar);

               } catch (err) {
                    console.log(err);
               };
          },

          async login(token: string, role: string, avatar: string) {
               try {
                    this.token = token;
                    this.role = role;
                    this.avatar = avatar;

                    localStorage.setItem('auth_token', this.token);
                    localStorage.setItem('role', this.role);
                    localStorage.setItem('avatar', this.avatar);
               } catch (err) {
                    console.log(err);
               };
          },

          async googleSignIn(token: string, role: string, avatar: string) {
               try {

                    this.token = token;
                    this.role = role;
                    this.avatar = avatar;

                    localStorage.setItem('auth_token', this.token);
                    localStorage.setItem('role', this.role);
                    localStorage.setItem('avatar', this.avatar);

               } catch (err) {
                    console.log(err);
               };
          },

          async signOut() {

               this.token = null;
               this.role = null;
               this.avatar = null;

               localStorage.removeItem('auth_token');
               localStorage.removeItem('role');
               localStorage.removeItem('avatar');
          },
     }
});
