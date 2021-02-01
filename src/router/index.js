import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const routerList = [
  {
    path:'/menu',
    component:()=>import('../views/menu/menu.vue'),
    name:'菜单管理'
  },
  {
   path:'/role',
   component:()=>import('../views/role/role.vue'),
   name:'角色管理'
 },
 {
   path:'/manger',
   component:()=>import('../views/manger/manger.vue'),
   name:'用户管理'
 },
 {
   path:'/cate',
   component:()=>import('../views/cate/cate.vue'),
   name:'商品分类'
 },
 {
   path:"/specs",
   component:()=>import('../views/specs/specs.vue'),
   name:"商品规格"
 },
 {
  path:"/goods",
  component:()=>import('../views/goods/goods.vue'),
  name:"商品管理"
 },
 {
  path:"/banner",
  component:()=>import('../views/banner/banner.vue'),
  name:"轮播图管理"
 },
 {
  path:"/member",
  component:()=>import('../views/member/member.vue'),
  name:"会员管理"
 },{
  path:"/seck",
  component:()=>import('../views/seck/seck.vue'),
  name:"秒杀活动"
 },
];
const router = new Router({
  routes: [
   {
     path:'/login',
     component:()=>import ('../pages/login.vue')
   },
   {
     path:'*',
     redirect:'/login'
   },
   {
     path:'/index',
     component:()=>import('../pages/index.vue'),
     children:[
       {
         path:'/home',
         component:()=>import('../views/home.vue')
       },
      ...routerList
     ]
   }
  ]
})
//全局导航守卫之登录拦截
router.beforeEach((to, from, next) => {
    // ...如果去登录就next
    if(to.path=='/login'){
      next()
      return
    }
    //如果有登录状态就next
    if(sessionStorage.getItem('loginInfo')){
      next()
      return
    }
    //都没有就强制跳回登录页
    next('/login')
  })

  export default router