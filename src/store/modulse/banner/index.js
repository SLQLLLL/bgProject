//引入接口文件
import {getBannerList} from '../../../util/axios'
//创造一个state模块
const state = {
    bannerList:[]
}
//创造一个getters模块
const getters = {
    getBannerlist(state){
        return state.bannerList
    }
}
//创造一个mutations模块
const mutations = {
    REQ_ADDBanner(state,payload){
        state.bannerList = payload
    }
}
//创造一个actions模块
const actions = {
    getBannerListAction({commit}){
        getBannerList()
        .then(res=>{
            if(res.data.code==200){
                commit('REQ_ADDBanner',res.data.list)
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