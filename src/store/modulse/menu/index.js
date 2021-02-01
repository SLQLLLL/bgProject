//引入接口文件
import {getMenuList} from '../../../util/axios'
//创造一个state模块
const state = {
    menuList:[]
}
//创造一个getters模块
const getters = {
    getMenuList(state){
        return state.menuList
    }
}
//创造一个mutations模块
const mutations = {
    REQ_addMenu(state,payload){
        state.menuList = payload
    }
}
//创造一个actions模块
const actions = {
    getMenuListAction({commit}){
        getMenuList()
        .then(res=>{
            if(res.data.code==200){
                commit('REQ_addMenu',res.data.list)
            }
            
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced:true
}