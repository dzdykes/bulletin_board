<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 md4 lg3 mx-auto>
        <v-card>
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
          <v-card-actions>
            <v-list>
              <v-list-tile class="pa-3">
                <v-list-tile-avatar>
                  <v-avatar>
                    <v-img
                      v-if="aUrl"
                      :src="aUrl"
                    >
                    </v-img>
                  </v-avatar>
                </v-list-tile-avatar>
                <v-list-tile-title>
                  {{ mName }}
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
            <v-spacer></v-spacer>
            <v-btn small class="outline blue lighten-1 grey--text text--lighten-3" dark flat @click="submit()">
              <span class="caption">Join!</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-divider class="transparent my-3"></v-divider>
    <v-layout>
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
      members: memberTypes.GET_MEMBERS
    }),
    filteredMembers () {
      return this.members.splice(0,5)
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
      setBid: types.SET_CURRENT_BID,
      createMember: memberTypes.CREATE_MEMBERSHIP
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
      })
    }
  },
  created () {
    const bid = this.bid
    if (bid) {
      this.fetchMembers(bid)
      this.setBid(bid)
    } else {
      this.$router.push('/')
    }
  }

}
</script>

<style>

</style>
