<template>
  <v-app>
    <v-content>
      <template v-if="user.email">
        <v-toolbar v-if="user.email" color="teal lighten-2" dark>
          <v-toolbar-side-icon @click="openUpMiniNav"></v-toolbar-side-icon>

          <v-toolbar-title>Bulletins</v-toolbar-title>

          <v-spacer></v-spacer>
  <!--         
          <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/bulletin">Bulletin</router-link>
          </div> -->
          <v-menu offset-y>          
            <v-chip slot="activator" class="teal lighten-4">
              <v-avatar>
                <v-icon class="grey--text text--darken-3">account_circle</v-icon>
              </v-avatar>
              <strong class="grey--text text--darken-3">{{ user.email }}</strong>
              <v-btn icon small :ripple="false">
                <v-icon class="grey--text text--darken-3">more_vert</v-icon>
              </v-btn>
            </v-chip>
            <v-list>
              <v-list-tile @click="signOut">
                <v-list-tile-title>Sign Out</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-toolbar>
        <mini-nav :open.sync="openMiniNav"></mini-nav>
      </template>
      <v-fade-transition mode="out-in">
        <router-view/>
      </v-fade-transition>
    </v-content>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex'
import MiniNav from '@/layout/LeftMenuMiniNav.vue'
import * as userTypes from '@/store/user-types'
import * as bulletinTypes from '@/store/bulletins-types'

export default Vue.extend({
  name: 'App',
  components: {
    MiniNav
  },
  data () {
    return {
      items: [],
      openMiniNav: false
    }
  },
  computed: {
    ...mapGetters({
      user: userTypes.GET_USER
    }),
    
  },
  watch: {
    'user' (newVal) {
      if (newVal.email) {
        this.fetchUserBulletins({ email: newVal.email, id: newVal.id })
      }
    },
    '$route.name' () {
      if (!this.user.id) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    ...mapActions({
      fetchUserBulletins: bulletinTypes.FETCH_USER_BULLETINS
    }),
    ...mapMutations({
      setUser: userTypes.SET_USER,
      setHasCreatedUser: userTypes.SET_HASCREATEDUSER,
      setUserBulletins: bulletinTypes.SET_USER_BULLETINS
    }),
    signOut () {
      this.setHasCreatedUser(false)
      this.setUser({})
      this.setUserBulletins([])
      this.$router.push('/')
    },
    openUpMiniNav () {
      this.openMiniNav = true
    }
  },
  created () {
    if (this.hasCreatedUser) {
      const u = this.user
      this.fetchUserBulletins({ email: u.email, id: u.id })
    }
    const jsonUser = localStorage.getItem('bulletin_board_user')
    let user = { email: null }
    if (jsonUser) {
      user = JSON.parse(jsonUser)
      if (user.email) {
        this.setUser(user)
        this.setHasCreatedUser(true)
      } else {
        this.$router.push('/')
      }
    }
  }
});
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
