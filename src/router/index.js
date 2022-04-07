import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'
import LoginView from '../views/LoginView.vue'
import UserView from '../views/user/UserView.vue'
import UserProducts from '../views/user/UserProducts.vue'
import UserSales from '../views/user/UserSales.vue'
import UserPurchases from '../views/user/UserPurchases.vue'
import UserEdit from '../views/user/UserEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/produto/:id',
    name: 'product',
    component: ProductView,
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/user',
    component: UserView,
    children: [
      {
        path: "",
        name: "user",
        component: UserProducts
      },
      {
        path: "",
        name: "purchases",
        component: UserPurchases
      },
      {
        path: "",
        name: "sales",
        component: UserSales
      },
      {
        path: "",
        name: "user-edit",
        component: UserEdit
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" })
  }
})

export default router
