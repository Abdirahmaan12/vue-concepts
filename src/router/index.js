import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login.vue'
import BlogReader from '../views/BlogReader.vue'
import StudentResults from '../views/StudentResults.vue'
import BookLibrary from '../views/BookLibrary.vue'
import ExpenseTracker from '../views/ExpenseTracker.vue'
import TaskTracker from '../views/TaskTracker.vue'
import MemberManager from '../views/MemberManager.vue'
import WeatherApp from '../views/WeatherApp.vue'
import QuizApp from '../views/QuizApp.vue'



const routes = [
  {
    path: '/',
    redirect: '/login' ,
  
  },
  
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/BlogReader',
    name: 'BlogReader',
    component: BlogReader
  },
  {
    path: '/StudentResults',
    name: 'StudentResults',
    component: StudentResults
  },
  {
    path: '/BookLibrary',
    name: 'BookLibrary',
    component: BookLibrary
  },
  {
    path: '/ExpenseTracker',
    name: 'ExpenseTracker',
    component: ExpenseTracker
  },
  {
    path: '/TaskTracker',
    name: 'TaskTracker',
    component: TaskTracker
  },
  {
    path: '/MemberManager',
    name: 'MemberManager',
    component: MemberManager
  },
  {
    path: '/WeatherApp',
    name: 'WeatherApp',
    component: WeatherApp
  },
  {
    path: '/QuizApp',
    name: 'QuizApp',
    component: QuizApp
  },


 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
