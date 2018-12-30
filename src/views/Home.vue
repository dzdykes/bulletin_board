<template>
  <v-container class="home" grid-list-lg :class="{'pa-0': !hasCreatedUser}" :fluid="!hasCreatedUser">
    <template v-if="!hasCreatedUser">
      <v-parallax
        dark
        :src="require('../assets/bulletin-background-blue-3.png')"
        :height="800"
      >
        <v-layout
          align-center
          column
          justify-center
        >
          <v-flex xs4>
            <create-user></create-user>
          </v-flex>
          <v-flex xs8></v-flex>
        </v-layout>
      </v-parallax>
    </template>
    <template v-else>
      <v-layout row wrap>
        <v-flex xs12 sm6>  
          <v-text-field
            prepend-inner-icon="search"
            placeholder="Search Your Bulletins"
            solo
            v-model="search"
          ></v-text-field>
          <template v-for="(b, i) in userBulletins"> 
            <div :key="b.bulletinId" class="mx-auto mb-3">
              <user-bulletin-card :bulletin="b" :reverse="i%2!=0" @viewBoard="viewBoard($event)"></user-bulletin-card>
            </div>
          </template>
        </v-flex>
        <v-flex v-if="hasCreatedUser" class="mx-auto" s xs12 sm6 md4 lg3>
          <v-layout column align-center fill-height>
            <v-divider class="my-3"></v-divider>
            <v-card class="py-5" hover :to="{ name: 'bulletins' }" height="200px" width="325px">
              <v-flex>
                <v-icon x-large>
                  search
                </v-icon>
              </v-flex>
              <v-flex>
                <div class="text-xs-center headline">
                  Find Bulletin
                </div>
              </v-flex>
            </v-card>
            <v-divider class="my-3"></v-divider>
            <v-card class="py-5" hover height="200px" width="325px" :to="{ name: 'create' }">
              <v-layout column fill-height align-center>
                <v-flex>
                  <v-icon x-large>
                    add_circle
                  </v-icon>
                </v-flex>
                <v-flex>
                  <div class="text-xs-center headline">
                    Create Bulletin
                  </div>
                </v-flex>
              </v-layout>
            </v-card>
          </v-layout>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import CreateUser from '@/components/CreateUser.vue';
import UserBulletinCard from '@/components/UserBulletinCard.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import * as userTypes from '@/store/user-types';

import * as bulletinTypes from '@/store/bulletins-types'

export default Vue.extend({
  name: 'home',
  components: {
    CreateUser,
    UserBulletinCard
  },
  data () {
    return {
      search: null
    }
  },
  computed: {
    ...mapGetters({
      user: userTypes.GET_USER,
      hasCreatedUser: userTypes.GET_HASCREATEDUSER,
      userBulletins: bulletinTypes.GET_USER_BULLETINS
    })
  },
  methods: {
    ...mapActions({
      fetchUserBulletins: bulletinTypes.FETCH_USER_BULLETINS
    }),
    ...mapMutations({
      setCurrentBid: bulletinTypes.SET_CURRENT_BID
    }),
    viewBoard (bulletin: any) {
      this.setCurrentBid(bulletin.bulletinId)
      this.$router.push({ name: 'viewboard' })
    }
  },
  created () {
    if (this.hasCreatedUser) {
      const u = this.user
      this.fetchUserBulletins({ email: u.email, id: u.id })
    }
  }
});
</script>
