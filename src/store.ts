import Vue from 'vue';
import Vuex from 'vuex';
import BulletinPost from './models/BulletinPost';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bulletinPosts: new Array<BulletinPost>()
  },
  mutations: {
    addBulletinPost (state, { subject, message }) {
      const b = new BulletinPost(subject, message)
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
    bulletinPosts: state => {
      return state.bulletinPosts
    }
  }
});
