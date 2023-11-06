import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Root',
      component: () => import('../views/RootView.vue')
    },
    {
      path: '/empty_menu',
      name: 'EmptyMenu',
      component: () => import('../views/EmptyMenuView.vue')
    },
    {
      path: '/menu',
      name: 'Menu',
      component: () => import('../views/MenuView.vue')
    },
    {
      path: '/receipt',
      name: 'Receipt',
      component: () => import('../views/ReceiptView.vue')
    },
    {
      path: '/mealtime_edit',
      name: 'MealtimeEdit',
      component: () => import('../views/MealtimeEditView.vue')
    },
    {
      path: '/menu_details',
      name: 'MenuDetails',
      component: () => import('../views/MenuDetailsView.vue')
    },
    {
      path: '/menu_edit',
      name: 'MenuEdit',
      component: () => import('../views/MenuEditView.vue')
    },
    {
      path: '/not_authorized',
      name: 'NotAuthorized',
      component: () => import('../views/NotAuthorizedView.vue')
    }
    ,
    {
      path: '/user',
      name: 'User',
      component: () => import('../views/UserView.vue')
    }
  ]
})

export default router
