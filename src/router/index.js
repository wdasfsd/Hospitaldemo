import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
  /* {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'documentation', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  } */
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/P1',
    component: Layout,
    children: [
      {
        path: '1',
        name: '门诊医生工作台',
        component: () => import('@/views/HIS/P8.vue'),
        meta: { title: '门诊医生工作台', icon: 'el-icon-s-platform', noCache: true, roles: ['admin', '医生'] }
      }
    ]
  },
  {
    path: '/P8',
    component: Layout,
    meta: { title: '预约挂号', icon: 'el-icon-s-order', noCache: true, roles: ['admin', '护士'] },
    children: [
      {
        path: '1',
        name: '挂号登记',
        component: () => import('@/views/HIS/P1.vue'),
        meta: { title: '挂号登记', noCache: true, roles: ['admin', '护士'] }
      },
      {
        path: '2',
        name: '挂号查询',
        component: () => import('@/views/HIS/P9.vue'),
        meta: { title: '挂号查询', noCache: true, roles: ['admin', '护士'] }
      }
    ]
  },
  {
    path: '/P9',
    component: Layout,
    meta: { title: '药库管理', icon: 'el-icon-box', noCache: true, roles: ['admin', '药剂师'] },
    children: [
      {
        path: '1',
        name: '药品信息',
        component: () => import('@/views/HIS/P1.vue'),
        meta: { title: '药品信息', noCache: true, roles: ['admin', '药剂师'] }
      },
      {
        path: '2',
        name: '入库',
        component: () => import('@/views/HIS/P1.vue'),
        meta: { title: '入库', noCache: true, roles: ['admin', '药剂师'] }
      },
      {
        path: '3',
        name: '出库',
        component: () => import('@/views/HIS/P1.vue'),
        meta: { title: '出库', noCache: true, roles: ['admin', '药剂师'] }
      }
    ]
  },
  {
    path: '/P10',
    component: Layout,
    meta: { title: '门诊费用', icon: 'el-icon-s-finance', noCache: true, roles: ['admin', '财务人员'] },
    children: [
      {
        path: '1',
        name: '收费',
        component: () => import('@/views/HIS/P1.vue'),
        meta: { title: '收费', noCache: true, roles: ['admin', '财务人员'] }
      },
      {
        path: '2',
        name: '收费查询',
        component: () => import('@/views/HIS/P1.vue'),
        meta: { title: '收费查询', noCache: true, roles: ['admin', '财务人员'] }
      }
    ]
  },
  {
    path: '/P11',
    component: Layout,
    meta: { title: '药房管理', icon: 'el-icon-s-home', noCache: true, roles: ['admin', '药剂师'] },
    children: [
      {
        path: '1',
        name: '发药',
        component: () => import('@/views/HIS/P1.vue'),
        meta: { title: '发药', noCache: true, roles: ['admin', '药剂师'] }
      },
      {
        path: '2',
        name: '退药',
        component: () => import('@/views/HIS/P1.vue'),
        meta: { title: '退药', noCache: true, roles: ['admin', '药剂师'] }
      },
      {
        path: '3',
        name: '发退药查询',
        component: () => import('@/views/HIS/P1.vue'),
        meta: { title: '发退药查询', noCache: true, roles: ['admin', '药剂师'] }
      }
    ]
  },
  {
    path: '/P14',
    component: Layout,
    meta: { title: '住院管理', icon: 'el-icon-school', noCache: true, roles: ['admin', '护士'] },
    children: [
      {
        path: '1',
        name: '入院登记',
        component: () => import('@/views/HIS/P1.vue'),
        meta: { title: '入院登记', noCache: true, roles: ['admin', '护士'] }
      },
      {
        path: '2',
        name: '住院查询',
        component: () => import('@/views/HIS/P1.vue'),
        meta: { title: '住院查询', noCache: true, roles: ['admin', '护士'] }
      },
      {
        path: '3',
        name: '出院结算',
        component: () => import('@/views/HIS/P1.vue'),
        meta: { title: '出院结算', noCache: true, roles: ['admin', '护士'] }
      }
    ]
  },
  {
    path: '/P12',
    component: Layout,
    meta: { title: '住院医生站', icon: 'el-icon-user', noCache: true, roles: ['admin', '医生'] },
    children: [
      {
        path: '1',
        name: '医嘱管理',
        component: () => import('@/views/HIS/P1.vue'),
        meta: { title: '医嘱管理', noCache: true, roles: ['admin', '医生'] }
      },
      {
        path: '2',
        name: '电子病例',
        component: () => import('@/views/HIS/P1.vue'),
        meta: { title: '电子病例', noCache: true, roles: ['admin', '医生'] }
      },
      {
        path: '3',
        name: '分配入科',
        component: () => import('@/views/HIS/P1.vue'),
        meta: { title: '分配入科', noCache: true, roles: ['admin', '医生'] }
      }
    ]
  },
  {
    path: '/P13',
    component: Layout,
    meta: { title: '住院护士站', icon: 'el-icon-user-solid', noCache: true, roles: ['admin', '护士'] },
    children: [
      {
        path: '1',
        name: '医嘱执行',
        component: () => import('@/views/HIS/P13.vue'),
        meta: { title: '医嘱执行', noCache: true, roles: ['admin', '护士'] }
      },
      {
        path: '2',
        name: '电子病例',
        component: () => import('@/views/HIS/P13.vue'),
        meta: { title: '电子病例', noCache: true, roles: ['admin', '护士'] }
      },
      {
        path: '3',
        name: '床位管理',
        component: () => import('@/views/HIS/P13.vue'),
        meta: { title: '床位管理', noCache: true, roles: ['admin', '护士'] }
      },
      {
        path: '4',
        name: '体温单',
        component: () => import('@/views/HIS/P13.vue'),
        meta: { title: '体温单', noCache: true, roles: ['admin', '护士'] }
      },
      {
        path: '5',
        name: '住院清单',
        component: () => import('@/views/HIS/P13.vue'),
        meta: { title: '住院清单', noCache: true, roles: ['admin', '护士'] }
      }
    ]
  },
  {
    path: '/P2',
    component: Layout,
    children: [
      {
        path: '1',
        name: '模版&常用项',
        component: () => import('@/views/HIS/P2.vue'),
        meta: { title: '模版&常用项', icon: 'el-icon-s-claim', noCache: true, roles: ['admin'] }
      }
    ]
  },
  {
    path: '/P3',
    component: Layout,
    children: [
      {
        path: '1',
        name: '排班表',
        component: () => import('@/views/HIS/P3.vue'),
        meta: { title: '排班表', icon: 'el-icon-s-order', noCache: true, roles: ['admin', '医生', '护士', '药剂师', '财务人员'] }
      }
    ]
  },
  {
    path: '/P4',
    component: Layout,
    children: [
      {
        path: '1',
        name: '门诊财务',
        component: () => import('@/views/HIS/P4.vue'),
        meta: { title: '门诊财务', icon: 'el-icon-s-check', noCache: true, roles: ['admin', '财务人员'] }
      }
    ]
  },
  {
    path: '/P5',
    component: Layout,
    meta: { title: '管理', icon: 'el-icon-s-tools', noCache: true, roles: ['admin'] },
    children: [
      {
        path: '1',
        name: '人员管理',
        component: () => import('@/views/HIS/P5.vue'),
        meta: { title: '人员管理', noCache: true, roles: ['admin'] }
      },
      {
        path: '2',
        name: '科室管理',
        component: () => import('@/views/HIS/P6.vue'),
        meta: { title: '科室管理', noCache: true, roles: ['admin'] }
      },
      {
        path: '3',
        name: '职位管理',
        component: () => import('@/views/HIS/P7.vue'),
        meta: { title: '职位管理', noCache: true, roles: ['admin'] }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
