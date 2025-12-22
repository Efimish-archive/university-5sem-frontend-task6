import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'

import CategoriesView from './views/CategoriesView.vue'
import CategoriesCreateView from './views/CategoriesCreateView.vue'
import CategoriesEditView from './views/CategoriesEditView.vue'

import PostsView from './views/PostsView.vue'
import PostsCreateView from './views/PostsCreateView.vue'
import PostsEditView from './views/PostsEditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView,
    },
    {
      path: '/categories/create',
      name: 'categories-create',
      component: CategoriesCreateView,
    },
    {
      path: '/categories/:id',
      name: 'categories-edit',
      component: CategoriesEditView,
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostsView,
    },
    {
      path: '/posts/create',
      name: 'posts-create',
      component: PostsCreateView,
    },
    {
      path: '/posts/:slug',
      name: 'posts-edit',
      component: PostsEditView,
    },
  ],
})

export default router
