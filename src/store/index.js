import { api } from '@/services/services'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    usuario: {
      id: "",
      nome: "",
      email: "",
      senha: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
    }
  },
  getters: {
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload
    },
    UPDATE_USER(state, payload) {
      state.usuario = Object.assign(state.usuario, payload)
    }
  },
  actions: {
    getUser(context, payload) {
      return api.get(`/usuario/${payload}`).then(r => {
        context.commit("UPDATE_USER", r.data)
        context.commit("UPDATE_LOGIN", true)
      })
    },
    createUser(context, payload) {
      context.commit("UPDATE_USER", { id: payload.email });
      return api.post("/usuario", payload);
    }
  },
  exitUser(context) {
    context.commit("UPDATE_USER", {
      id: "",
      nome: "",
      email: "",
      senha: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: ""
    });
    context.commit("UPDATE_LOGIN", false);
  },
  modules: {
  }
})
