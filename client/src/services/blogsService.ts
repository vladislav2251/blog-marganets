import axios from 'axios'

const HTTP = axios.create({
	baseURL: 'http://localhost:5050/api/v2',
	withCredentials: true,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

export default {

     async getAllBlogs() {
          try {

               const response = await HTTP.get("/blogs");
               console.log(response.data)
               return response.data;

          } catch (err) {
               throw err;
          };
     },

     async getBlog(blogId: string) {
          try {

               const response = await HTTP.get(`/blog/detail/${blogId}`);
               console.log(response.data);
               return response.data;
                
          } catch (err) {
               throw err;
          };
     },
};