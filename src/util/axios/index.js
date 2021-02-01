
import http from './axios'

//封装获取菜单列表接口
export function getMenuList(){
   return http.get('/api/menulist?istree=true')
}
//封装添加菜单接口

export function addInfo(data){
   return http.post('/api/menuadd',data)
}

//封装删除菜单列表接口
export function delMenu(data){
   return http.post('/api/menudelete',data)
}

//封装获取一条菜单数据的接口
export function menuInfo(params){
   return http.get('/api/menuinfo',
   {
      params
   })
}

//封装更新菜单数据接口
export function menuUpdate(data){
   return http.post('/api/menuedit',data)
}

//================角色列表的接口====================

//封装获取角色列表接口
export function getRoleList(){
   return http.get('/api/rolelist')
}
//封装添加角色接口

export function addRole(data){
   return http.post('/api/roleadd',data)
}

//封装删除角色列表接口
export function delRole(data){
   return http.post('/api/roledelete',data)
}

//封装获取一条角色数据的接口
export function roleInfo(params){
   return http.get('/api/roleinfo',
   {
      params
   })
}

//封装更新角色数据接口
export function roleUpdate(data){
   return http.post('/api/roleedit',data)
}

//=================管理员列表的接口=================
//封装获取管理员列表接口
export function getMangerList(params){
   return http.get('/api/userlist',{
      params
   })
}
//封装添加管理员接口

export function addManger(data){
   return http.post('/api/useradd',data)
}

//封装删除管理员列表接口
export function delManger(data){
   return http.post('/api/userdelete',data)
}

//封装获取一条管理员数据的接口
export function mangerInfo(params){
   return http.get('/api/userinfo',
   {
      params
   })
}

//封装更新管理员数据接口
export function mangerUpdate(data){
   return http.post('/api/useredit',data)
}

//封装管理员数据总数的接口
export function userCount(){
   return http.get('/api/usercount')
}
//封装管理员登录的接口
export function mangerLogin(data){
   return http.post('/api/userlogin',data)
}

//================商品管理接口=================
//封装获取商品分类接口
export function getCateList(){
   return http.get('/api/catelist?istree=true')
}
//封装添加商品分类接口

export function addCate(data){
   return http.post('/api/cateadd',data)
}

//封装删除商品分类接口
export function delCate(data){
   return http.post('/api/catedelete',data)
}

//封装获取一条商品分类的接口
export function cateInfo(params){
   return http.get('/api/cateinfo',
   {
      params
   })
}

//封装更新商品分类接口
export function cateUpdate(data){
   return http.post('/api/cateedit',data)
}

//=================商品规格接口=====================
//封装获取商品规格列表接口
export function getSpecsList(params){
   return http.get('/api/specslist',{
      params
   })
}
//封装添加商品规格接口

export function addSpecs(data){
   return http.post('/api/specsadd',data)
}

//封装删除商品规格列表接口
export function delSpecs(data){
   return http.post('/api/specsdelete',data)
}

//封装获取一条商品规格数据的接口
export function specsInfo(params){
   return http.get('/api/specsinfo',
   {
      params
   })
}

//封装更新商品规格数据接口
export function specsUpdate(data){
   return http.post('/api/specsedit',data)
}

//封装商品规格数据总数的接口
export function specsCount(){
   return http.get('/api/specscount')
}

//==============商品管理接口================
//封装获取商品管理列表接口
export function getGoodsList(params){
   return http.get('/api/goodslist',{
      params
   })
}
//封装添加商品管理接口

export function addGoods(data){
   let file = new FormData();
   //FormData 数据的添加只能用append ,获取值也只能用get方式获取
   //循环添加 对象 转化成了 FormData这种格式
   for (let i in data) {
      file.append(i, data[i]);
   }
   return http.post('/api/goodsadd',file)
}

//封装删除商品管理列表接口
export function delGoods(data){

   return http.post('/api/goodsdelete',data)
}

//封装获取一条商品管理数据的接口
export function goodsInfo(params){
   return http.get('/api/goodsinfo',
   {
      params
   })
}

//封装更新商品管理数据接口
export function goodsUpdate(data){
   let file = new FormData();
   //FormData 数据的添加只能用append ,获取值也只能用get方式获取
   //循环添加 对象 转化成了 FormData这种格式
   for (let i in data) {
      file.append(i, data[i]);
   }
   return http.post('/api/goodsedit',file)
}

//封装商品管理数据总数的接口
export function goodsCount(){
   return http.get('/api/goodscount')
}
//===============轮播图接口====================
//封装获取轮播图列表接口
export function getBannerList(){
   return http.get('/api/bannerlist')
}
//封装添加轮播图接口

export function addBanner(data){
   let file = new FormData();
  //FormData 数据的添加只能用append ,获取值也只能用get方式获取
  //循环添加 对象 转化成了 FormData这种格式
  for (let i in data) {
     file.append(i, data[i]);
  }
   return http.post('/api/banneradd',file)
}

//封装删除轮播图列表接口
export function delBanner(data){
   return http.post('/api/bannerdelete',data)
}

//封装获取一条轮播图数据的接口
export function bannerInfo(params){
   return http.get('/api/bannerinfo',
   {
      params
   })
}

//封装更新轮播图数据接口
export function bannerUpdate(data){
   let file = new FormData();
   //FormData 数据的添加只能用append ,获取值也只能用get方式获取
   //循环添加 对象 转化成了 FormData这种格式
   for (let i in data) {
      file.append(i, data[i]);
   }
   return http.post('/api/banneredit',file)
}
//===================秒杀活动接口===================
//封装秒杀活动添加接口
export function getSeckAdd(data) {
   return http.post('/api/seckadd', data)
 }
 //封装秒杀活动列表接口
 export function getSeckList( params) {
   return http.get('/api/secklist', {
      params
   })
 }
 //封装秒杀活动获取（一条）接口
 export function getSeckInfo(params) {
   return http.get('/api/seckinfo', {
      params
   })
 }
 //封装秒杀活动修改接口
 export function getSeckEdit(data) {
   return http.post('/api/seckedit', data)
 }
 //封装秒杀活动删除接口
 export function getSeckDelete(data) {
   return http.post('/api/seckdelete', data)
 }
 
 
 /* =============会员管理=========== */
  //封装会员管理列表接口
  export function getMemberList(){
   return http.get('/api/memberlist')
 }
 //封装会员管理获取（一条）接口
 export function getMemberInfo(params){
   return http.get('/api/memberinfo',{
       params
   })
 }
 //封装会员管理修改接口
 export function getMemberEdit(data){
   return http.post('/api/memberedit',data)
 }