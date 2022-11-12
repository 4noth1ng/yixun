import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        allProjects:[],
        access_token:'',
        userid:0
    },
    actions:{
        storeAllProjects(ctx,data){
            ctx.commit("storeAllProjects",data)
        }
    },
    mutations:{
        storeAllProjects(state,data){
            state.allProjects = data
        },
        storeAccessToken(state,data){
            state.access_token = data
        },
        storeUserId(state,data){
            state.userid = data
        }
    }
})