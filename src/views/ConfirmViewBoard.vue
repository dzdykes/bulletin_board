<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm8 md6 lg4 xl3 mx-auto class="text-xs-left">
        <v-card class="elevation-2">
          <v-card-title class="title blue darken-4 blue-grey--text text--lighten-4">
            Continue to &nbsp;<strong>{{membership.bulletinName}} as:</strong>
          </v-card-title>
          <v-card-text>
            <v-list-tile :key="membership.id">
              <v-list-tile-avatar>
                <v-avatar>
                  <v-img
                    lazy-src="https://cdn.shopify.com/s/files/1/2312/7883/products/IMG_4048_400x.png"
                    :src="membership.avatarUrl"
                  >
                  </v-img>
                </v-avatar>
              </v-list-tile-avatar>
              <v-list-tile-content>  
                <v-list-tile-title>
                  {{ membership.name }}
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  {{ membership.dateJoined }}
                </v-list-tile-sub-title>
              </v-list-tile-content>
              
            </v-list-tile>
          </v-card-text>
          <v-card-actions>
            <v-btn block flat outline class="blue darken-3 blue--text text--darken-3" @click="submit">
              Continue To Bulletin <v-icon right>arrow_forward</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-divider class="transparent my-3"></v-divider>
    <v-layout v-if="filteredMembers.length">
      <v-flex xs12 sm10 md8 lg6 xl5 mx-auto>
        <v-list class="elevation-1 pb-0">
          <h3>Other Members</h3>
          <template v-for="m in filteredMembers">
            <v-list-tile class="pa-3" :key="m.id">
              <v-list-tile-avatar>
                <v-avatar>
                  <v-img
                    :src="m.avatarUrl"
                  >
                  </v-img>
                </v-avatar>
              </v-list-tile-avatar>
              <v-list-tile-title>
                {{ m.name }}
              </v-list-tile-title>
              <v-list-tile-sub-title>
                {{ m.dateJoined }}
              </v-list-tile-sub-title>
            </v-list-tile>
            <v-divider :key="m.id+'divider'"></v-divider>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import * as memberTypes from '@/store/member-types'
import * as types from '../store/bulletins-types'
import * as userTypes from '../store/user-types'

const REGEX = /^((https?|ftp):)?\/\/.*(jpeg|jpg|png|gif|bmp)$/

export default {
  name: 'ConfirmViewBoard',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      bid: types.GET_CURRENT_BID,
      members: memberTypes.GET_MEMBERS,
      membership: memberTypes.GET_MEMBERSHIP,
      user: userTypes.GET_USER
    }),
    filteredMembers () {
      const mid = this.membership.id
      return this.members.filter((memb) => memb.id !== mid).splice(0, 5)
    }
  },
  watch: {
    bid (newVal) {
      this.fetchMembers(newVal)
    }
  },
  methods: {
    ...mapActions({
      fetchMembers: memberTypes.FETCH_MEMBERS,
      fetchMembership: memberTypes.FETCH_MEMBERSHIP,
      fetchBulletin: types.FETCH_BULLETIN
    }),
    ...mapMutations({
      setMembership: memberTypes.SET_MEMBERSHIP
    }),
    submit () {
      const bid = this.bid
      this.fetchBulletin({id: bid})
      this.$router.push('bulletin')
    }
  },
  created () {
    const bid = this.bid
    const email = this.user.email
    this.fetchMembership({email, bulletinId: bid}).catch(() => {
      this.$router.push('/')
    })
    this.fetchMembers(bid)
  }
}
</script>

<style>

</style>
