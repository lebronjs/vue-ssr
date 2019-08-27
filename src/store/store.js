import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const fetchBar = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('foo 组件返回 ajax 数据');
    }, 1000);
  });
};

function createStore() {
  const store = new Vuex.Store({
    state: {
      foo: ''
    },

    mutations: {
      'SET_Foo'(state, data) {
        state.foo = data;
      }
    },

    actions: {
      fetchBar({ commit }) {
        return fetchBar().then((data) => {
          commit('SET_Foo', data);
        }).catch((err) => {
          console.error(err);
        })
      }
    }
  });

  if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
    console.log('window.__INITIAL_STATE__', window.__INITIAL_STATE__);
    store.replaceState(window.__INITIAL_STATE__);
  }
  
  return store;
}

export default createStore;