import { getMangerList, userCount } from '../../../util/axios'
const state = {
    mangerList: [],
    size: 2,
    page: 1,
    countNum: 0
}

const getters = {
    getMangerList(state) {
        return state.mangerList
    },
    getMangerSize(state) {
        return state.size
    },
    getMangerNum(state) {
        return state.countNum
    }
}

const mutations = {
    REQ_MANGERLIST(state, payload) {
        state.mangerList = payload
    },
    REQ_COUNT(state, payload) {
        state.countNum = payload
    },
    REQ_PAGE(state, payload) {
        state.page = payload
    }
}

const actions = {
    //封装获取管理员列表的行动
    getMangerListAction(payload) {
        console.log(payload, '上下文对象');
        getMangerList({
            size: payload.state.size,
            page: payload.state.page
        }).then(res => {
            if (res.data.code == 200) {
                let list = res.data.list?res.data.list:[]
                console.log(res, '数据响应');
                payload.commit('REQ_MANGERLIST', res.data.list)

                if(payload.state.page!=1&&list.length==0){
                    payload.dispatch('changePageAction',payload.state.page-1)
                    return
                }
            }
        })
    },

    //封装一个获取总数的行动
    getMangerCountAction(payload) {
        userCount()
            .then(res => {
                if (res.data.code == 200) {
                    console.log(res.data.list[0].total, 'aaa');
                    payload.commit('REQ_COUNT', res.data.list[0].total)
                }
            })
    },

    //封装一个修改page行动
    changePageAction(context, payload) {
        context.commit('REQ_PAGE', payload)
        context.dispatch('getMangerListAction')
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}