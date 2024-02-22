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
			authStore.register(response.data.token, response.data.user.role, response.data.user.avatar.url);

		} catch (err) {
			throw err;
		};
	},

	async login(user: object) {
		try {

			const authStore = useAuthStore();
			const response = await HTTP.post("/api/v2/login", user);

			authStore.login(response.data.token, response.data.user.role, response.data.user.avatar.url);

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
};