import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import input from '../views/input.vue'
import RegisterView from '../views/RegisterView.vue'
import BaseCard from '../views/BaseCard.vue'
import DynamicTabs from '../views/DynamicTabs.vue'
import login from '../views/login.vue'
import Datepicker from '../views/Datepicker.vue'
import tables from '../views/tables.vue'
import form from '../views/form.vue'


const routes = [
  {
    path: '/',
    redirect: '/login' ,
  
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/input',
    name: 'input',
    component: input
  },
  {
    path: '/RegisterView',
    name: 'RegisterView',
    component: RegisterView
  },
  {
    path: '/BaseCard',
    name: 'BaseCard',
    component: BaseCard
  },
  {
    path: '/DynamicTabs',
    name: 'DynamicTabs',
    component: DynamicTabs
  },
  
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/Datepicker',
    name: 'Datepicker',
    component: Datepicker
  },
  {
    path: '/tables',
    name: 'tables',
    component: tables
  },
  {
    path: '/form',
    name: 'form',
    component: form
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
