import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import menu  from './modulse/menu'
import role from './modulse/role'
import manger from './modulse/manger'
import cate from './modulse/cate'
import specs from './modulse/specs'
import goods from './modulse/goods'
import banner from './modulse/banner'
import member from './modulse/member'
import seck from './modulse/seck'


export default new Vuex.Store({
    state: {
        loginInfo: sessionStorage.getItem('loginInfo') ? JSON.parse(sessionStorage.getItem('loginInfo')) : null //个人信息
      },
      getters: {
        getUserInfo(state) {
          return state.loginInfo
        }
      },
      mutations: {
        CHANGE_USER(state, payload) {
          state.loginInfo = payload
          if (payload) {
            //设置本地存储
            sessionStorage.setItem('loginInfo', JSON.stringify(payload))
          } else {
            sessionStorage.removeItem('loginInfo')
          }
        }
      },
      //actionsstate
      actions: {
        changeUserInfoAction(contxt, payload) {
          contxt.commit('CHANGE_USER', payload)
        }
      },
    modules:{
        menu,
        role,
        manger,
        cate,
        specs,
        goods,
        banner,
        member,
        seck
    }
})