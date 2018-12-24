import Vue from 'vue';
import Vuex from 'vuex';
import BulletinPost from '../models/BulletinPost';
import bulletins from './modules/bulletins'
import user from './modules/user'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    bulletins,
    user
  },
  state: {
    bulletinPosts: new Array<BulletinPost>()
  },
  mutations: {
    addBulletinPost (state, { subject, message, imageUrl }) {
      const b = new BulletinPost(subject, message, imageUrl)
      state.bulletinPosts.push(b);
    },
    removeBulletinPost (state, id) {
      const index = state.bulletinPosts.findIndex((b) => id === b.id);
      if (index > -1) {
        state.bulletinPosts.splice(index, 1);
      }
    },
  },
  actions: {

  },
  getters: {
    bulletinPosts: (state) => {
      return state.bulletinPosts
    }
  }
});
