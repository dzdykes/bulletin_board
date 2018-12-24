<template>
  <v-container class="home" grid-list-lg>
    <v-layout row wrap>
      <template v-if="!hasCreatedUser">
        <v-flex class="mx-auto" xs12 sm6 md4 lg3>
          <create-user></create-user>
        </v-flex>
      </template>
      <template v-else>
        <template v-for="(b, i) in userBulletins">
          <v-flex :key="b.bulletinId" class="mx-auto" xs12 sm6 lg4>
            <user-bulletin-card :bulletin="b" :reverse="i%2!=0"></user-bulletin-card>
          </v-flex>
        </template>
      </template>
      <v-flex v-if="hasCreatedUser" class="mx-auto" s xs12 sm6 lg4>
        <v-layout column justify-center align-center fill-height>
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
          <v-divider class="my-5"></v-divider>
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
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import CreateUser from '@/components/CreateUser.vue';
import UserBulletinCard from '@/components/UserBulletinCard.vue';
import { mapGetters, mapActions } from 'vuex';
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
    })
  },
  created () {
    if (this.hasCreatedUser) {
      const u = this.user
      this.fetchUserBulletins({ email: u.email, id: u.id })
    }
  }
});
</script>
