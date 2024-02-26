import axios from 'axios';

const HTTP = axios.create({
	baseURL: 'http://localhost:5050/api/v2',
	withCredentials: true,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

export default {
     async getDetailUser(userId: string) {
          try {

                const response = await HTTP.get(`/admin/single/${userId}`);
                return response.data;
                 
          } catch (err) {
               throw err;
          };
     }, 

     async getAllUser() {
          try {

               const response = await HTTP.get("/users");
               return response.data;

          } catch (err) {
               throw err;
          };
     },

     async getMeAccount() {
          const token = document.cookie;

          const response = await HTTP.get("/me", {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          });

          return response.data;
     },
};