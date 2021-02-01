import {getSpecsList,specsCount} from '../../../util/axios'

const state={
    specsList:[],
    page:1,
    size:3,
    countNum:0
}

const getters ={
    getSpecsList(state){
        return state.specsList
    },
    getSpecsSize(state){
        return state.size
    },
    getSpecsCount(state){
        return state.countNum
    }

}

const mutations = {
    REQ_SPECSLIST(state,payload){
        state.specsList=payload
    },
    REQ_SPECSCOUNT(state,payload){
        state.countNum = payload
    },
    REQ_CHANGEPAGE(state,payload){
        state.page = payload
    }
}

const actions = {
    //封装获取商品规格的行动
    getSpecsListAction(payload){
        getSpecsList({
            page:payload.state.page,
            size:payload.state.size
        }).then(res=>{
            let list = res.data.list?res.data.list:[]
            if(res.data.code==200){
                payload.commit("REQ_SPECSLIST",res.data.list)
            }

            if(payload.state.page!=1&&list.length==0){
                payload.dispatch('changePageAction',payload.state.page-1)
                return
            }
        })
    },
    //封装获取总数的行动
    getCountAction(payload){
        specsCount().then(res=>{
            if(res.data.code==200){
                payload.commit("REQ_SPECSCOUNT",res.data.list[0].total)
            }
        })
    },
    //封装改变页数的行动
    changePageAction(context,payload){
        context.commit("REQ_CHANGEPAGE",payload)
        context.dispatch("getSpecsListAction")
    },
    
} 

export default{
    state,
    getters,
    mutations,
    actions,
    namespaced:true
}