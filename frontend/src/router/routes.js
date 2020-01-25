var userCookies = []
const routes = [
// GENERAL
  {
    path: '/',
    component: () => import('layouts/GeneralLayout.vue'),
    children:[      
      { path: 'home',     component: () => import('pages/general/HomePage.vue') },
      { path: 'login',    component: () => import('pages/User/Login.vue') },
      { path: 'register', component: () => import('pages/User/Register.vue') },
      { path: '/view_product/:product_name', component: () => import('pages/user/ViewProduct.vue') },
      { path: 'checkout', component: () => import('pages/User/CheckOutPage.vue') },
      { 
        path: 'my_cart', 
        component: () => import('pages/User/MyCart.vue') ,
        beforeEnter(to, from, next) {          
          userCookies = JSON.parse(localStorage.getItem('vuex'));
          if (userCookies == null) {
            next('/login')  
          }
          else {
            if (userCookies.central.user_cookies == 0) {
              next('/login')
            }
            else {
              next()
            }
          }
        }        
      }
    ]
  },  
  
// USER
  {
    path: '/user', 
    component: () => import('layouts/UserLayout.vue'),
    children: [ 
      { path: 'manage_account', component: () => import('pages/User/ManageAccountPage.vue') },
      { path: 'my_order', component: () => import('pages/User/MyOrderPage.vue') },
    ],
    beforeEnter(to, from, next) {
      userCookies = JSON.parse(localStorage.getItem('vuex'));
      if (userCookies == null) {
        next('/login')  
      }
      else {
        if (userCookies.central.user_cookies == 0) {
          next('/login')
        }
        else {
          if (userCookies.central.user_cookies.role == 'user') {
            next()
          }
        }
      }
    }
  },

// ADMIN
  {
    path: '/admin/', 
    component: () => import('layouts/AdminLayout.vue'),
    children: [ 
      { path: 'dashboard',  component: () => import('pages/admin/DashboardPage.vue'), },
      { path: 'category',   component: () => import('pages/admin/CategoryPage.vue') },
      { path: 'delivery',   component: () => import('pages/admin/DeliveryPage.vue') },
      { path: 'view_transaction/:transaction_id',  
                            component: () => import('pages/admin/ViewTransactionPage.vue') },
      { path: 'products',   component: () => import('pages/admin/product/ProductList.vue') },
      { path: 'new-product',component: () => import('pages/admin/product/NewProduct.vue') },
      { path: 'sales',      component: () => import('pages/admin/product/ProductSales.vue') } 
    ],
    beforeEnter(to, from, next) {          
      userCookies = JSON.parse(localStorage.getItem('vuex'));
      if (userCookies == null) {
        next('/login')  
      }
      else {
        if (userCookies.central.user_cookies == 0) {
          next('/login')
        }
        else {
          if (userCookies.central.user_cookies.role == 'admin') {
            next()
          }
          else {
            next('/home')
          }
        }
      }
    } 
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
