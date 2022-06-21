import { createRouter, createWebHistory } from "vue-router";
import { useStore } from '@/stores'
import jwt_decode from "jwt-decode";
import keys from '@/keys'
import moment from 'moment'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: "home",
      component: () => import("../views/HomeView.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/auth/Login.vue"),
    },
    {
      path: '/about',
      name: "about",
      component: () => import("../views/AboutView.vue")
    },
    {
      path: '/coins/:symbol',
      name: "coin-detail",
      component: () => import("../views/CoinDetail/index.vue")
    },
    {
      path: '/categories',
      name: "category",
      component: () => import("../views/Category.vue")
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   const store = useStore()
//   const accessToken = localStorage.getItem(keys.LOCAL_STORAGE.access_token)
//   if (accessToken) {
//     const parseToken = jwt_decode(accessToken)
//     if (parseToken.exp < moment().unix()) {
//       store.auth(false)
//       localStorage.removeItem(keys.LOCAL_STORAGE.access_token)
//     } else {
//       store.auth(true)
//     }
//   }

//   if (to.name !== 'login' && !store.isAuth) next({ name: 'login' })
//   else next()
// })

export default router;
