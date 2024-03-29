import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/HomePage.vue') }],
  },
  {
    path: '/portfolio',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Portfolio.vue') }],
  },
  {
    path: '/bio',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Bio.vue') }],
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/admin',
    component: () => import('pages/Admin.vue')
  },
  // {
  //   path: '/signup',
  //   component: () => import('pages/Signup.vue')
  // },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
