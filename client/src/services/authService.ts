import axios from 'axios';
import { useAuthStore } from '@/stores/authStore.js';

const HTTP = axios.create({
	baseURL: 'http://localhost:5050',
	withCredentials: true,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

export default {

	async register(user: object) {
		try {

			const authStore = useAuthStore();
			const response = await HTTP.post("/api/v2/register", user);

			localStorage.setItem('role', response.data.user.role);
			authStore.register(response.data.user.role, response.data.user.avatar, response.data.user.name);

		} catch (err) {
			throw err;
		};
	},

	async login(user: object) {
		try {

			const authStore = useAuthStore();
			const response = await HTTP.post("/api/v2/login", user);

			authStore.login(response.data.user.role, response.data.user.avatar, response.data.user.name);

		} catch (err) {
			throw err;
		};
	},

	async googleSignIn() {
		try {

			window.location.href = "http://localhost:5050/auth/google"
			
		} catch (error) {
			console.error("Error during Google login:", error);
		}
	},

	async signOut() {
		try {

			const response = HTTP.get("/api/v2/logout");
			localStorage.clear();

			return (await response).data

		} catch (err) {
			throw err;
		};
	},
};