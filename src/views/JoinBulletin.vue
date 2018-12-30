<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm10 md8 lg6 xl5 mx-auto>
        <v-card v-if="!membership || !membership.id">
          <v-card-title class="title" primary-title>
            <strong>Create Membership</strong>
          </v-card-title>
          <v-card-text>
            <v-text-field 
              label="Member Name"
              v-model="mName"
            box />
            <v-text-field box 
              label="Avatar Image Url"
              v-model="aUrl"
            />
            <v-textarea 
              label="Member Description"
              v-model="mDesc"
            box />
          </v-card-text>
          <v-card-actions class="pr-3">
            <v-list>
              <v-list-tile class="pa-1">
                <v-list-tile-avatar>
                  <v-avatar>
                    <v-img
                      v-if="imageSrcToLoad"
                      :src="imageSrcToLoad"
                    >
                    </v-img>
                    <v-icon
                      v-else
                    >
                      person_add
                    </v-icon>
                  </v-avatar>
                </v-list-tile-avatar>
                <v-list-tile-title>
                  {{ mName || 'Member Name' }}
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
            <v-spacer></v-spacer>
            <v-btn large class="outline blue lighten-1 grey--text text--lighten-3" dark flat @click="submit()">
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-else>
          <v-card-title class="title">
            You are already a member
          </v-card-title>
          <v-card-text>
            <v-list-tile :key="membership.id">
              <v-list-tile-avatar>
                <v-avatar>
                  <v-img
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
              <v-list-tile-action>    
                <v-btn small class="outline blue lighten-1 grey--text text--lighten-3" dark flat to="/">
                  <span class="caption">My Bulletins</span>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-divider class="transparent my-3"></v-divider>
    <v-layout v-if="filteredMembers.length">
      <v-flex xs12 sm6 md4 lg3 mx-auto>
        <v-list>
          <h3>Some Members Include</h3>
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
  name: 'JoinBulletin',
  data () {
    return {
      mName: null,
      aUrl: null,
      mDesc: null
    }
  },
  computed: {
    ...mapGetters({
      bid: types.GET_CURRENT_BID,
      user: userTypes.GET_USER,
      members: memberTypes.GET_MEMBERS,
      membership: memberTypes.GET_MEMBERSHIP
    }),
    filteredMembers () {
      return this.members.splice(0, 5)
    },
    imageSrcToLoad () {
      if (!this.aUrl) {
        return false
      }
      const urlToTest = this.aUrl.split('?')[0]
      if (REGEX.test(urlToTest) || this.aUrl.includes('images.unsplash')) {
        return this.aUrl
      }
      return false
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
      createMember: memberTypes.CREATE_MEMBERSHIP
    }),
    ...mapMutations({
      setBid: types.SET_CURRENT_BID
    }),
    submit () {
      const user = this.user
      const bid = this.bid
      const mName = this.mName
      const aUrl = this.aUrl
      const mDesc = this.mDesc

      this.createMember({
        email: user.email,
        bulletinId: bid,
        memberName: mName,
        avatarUrl: aUrl,
        description: mDesc
      }).then(() => {
        this.$router.push({ name: 'home' })
      })
    }
  },
  created () {
    const bid = this.bid
    const email = this.user.email
    this.fetchMembers(bid)
    this.fetchMembership({email, bulletinId: bid})
    this.setBid(bid)
  }

}
</script>

<style>

</style>
