import {getGoodsList,goodsCount} from '../../../util/axios'

const state={
    goodsList:[],
    page:1,
    size:3,
    countNum:0
}

const getters ={
    getGoodsList(state){
        return state.goodsList
    },
    getGoodsSize(state){
        return state.size
    },
    getGoodsCount(state){
        return state.countNum
    }

}

const mutations = {
    REQ_GOODSLIST(state,payload){
        state.goodsList=payload
    },
    REQ_GOODSCOUNT(state,payload){
        state.countNum = payload
    },
    REQ_CHANGEPAGE(state,payload){
        state.page = payload
    }
}

const actions = {
    //封装获取商品规格的行动
    getGoodsListAction(payload){
        getGoodsList({
            page:payload.state.page,
            size:payload.state.size
        }).then(res=>{
            let list = res.data.list?res.data.list:[]
            if(res.data.code==200){
                payload.commit("REQ_GOODSLIST",res.data.list)
            }

            if(payload.state.page!=1&&list.length==0){
                payload.dispatch('changePageAction',payload.state.page-1)
                return
            }
        })
    },
    //封装获取总数的行动
    getCountAction(payload){
        goodsCount().then(res=>{
            if(res.data.code==200){
                payload.commit("REQ_GOODSCOUNT",res.data.list[0].total)
            }
        })
    },
    //封装改变页数的行动
    changePageAction(context,payload){
        context.commit("REQ_CHANGEPAGE",payload)
        context.dispatch("getGoodsListAction")
    },
    
} 

export default{
    state,
    getters,
    mutations,
    actions,
    namespaced:true
}