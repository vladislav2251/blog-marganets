import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Index from '@/views/Index.vue';
import Contacts from '@/views/Contacts.vue';
import Blogs from '@/views/Blogs.vue';
import Blog from '@/views/Blog.vue';

import SignUp from '@/views/SignUp.vue';
import SignIn from '@/views/SignIn.vue';

const routes: Array<RouteRecordRaw> = [
     { path: "/", name: "Index", component: Index, meta: { title: "Марганецький ліцей № 10" } },
     { path: "/login", name: "SignIn", component: SignIn, meta: { title: "Марганецький ліцей № 10 Авторизация", hideHeader: true, } },
     { path: "/register", name: "SignUp", component: SignUp, meta: { title: "Марганецький ліцей № 10 Регистрация", hideHeader: true, } },
     { path: "/category/news", name: "Blogs", component: Blogs, meta: { title: "Марганецький ліцей № 10 Новини", } },
     { path: "/category/news/detail/:id", name: "Blog", component: Blog, meta: { title: "Марганецький ліцей № 10 Новини детально", } },
     { path: "/contacts", name: "Contacts", component: Contacts , meta: { title: "Марганецький ліцей № 10 Контакти" } },
];

const router = createRouter({
     history: createWebHistory(),
     routes,
});

router.beforeEach((to, from, next) => {
     document.title = to.meta.title as string;
     next();
});
export default router;