<template>
  <v-container grid-list-lg>
    <v-layout wrap row>
      <v-flex xs12 sm6 md4 lg3 v-for="(b, i) in bulletinPosts" :key="i.subject + i" xs4>
        <v-card>
          <v-img
            :src="b.rectangleImageUrl"
            aspect-ratio="2.75"
          ></v-img>
          <v-card-title>
            <span class="headline text-xs-left mb-0">{{ b.subject }}</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
            <div>
              <div>{{ b.message }}</div>
              <div class="caption">Likes: {{ b.likes }}</div>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn block flat color="grey" disabled>Comment</v-btn>
            <v-btn block flat color="blue">Recognize</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3>  
        <v-card class="py-5 transparent" flat hover @click="startAdd()" height="200px">
          <v-layout column fill-height align-center>
            <v-flex>
              <v-icon x-large>
                add_circle
              </v-icon>
            </v-flex>
            <v-flex>
              <div class="text-xs-center headline">
                Add Post
              </div>
            </v-flex>
          </v-layout>
        </v-card>
        <v-dialog
          v-model="dialog"
          width="420"
        >
          <v-card>
            <v-card-text>
              <v-text-field
                v-model="newSubject"
                label="Subject"
              >
              </v-text-field>
              <v-text-field
                label="Message"
                v-model="newMessage"
              >
              </v-text-field>
              <v-text-field
                label="Rec Image Url"
                v-model="newImageUrlRec"
              >
              </v-text-field>
              <v-text-field
                label="Sq Image Url"
                v-model="newImageUrlSq"
              >
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn flat outline large color="red darken-4" @click="dialog = false">
                Cancel
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn flat 
                outline
                large
                color="green darken-4"
                @click="submit(); dialog = false"
              s>
                Add
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex'
import * as memberTypes from '@/store/member-types'
import * as userTypes from '../store/user-types'
import * as types from '../store/bulletins-types'

export default Vue.extend({
  name: 'bulletin-section',
  data () {
    return {
      dialog: false,
      likeAdded: false,
      newMessage: '',
      newImageUrlSq: '',
      newImageUrlRec: '',
      newSubject: '',
      loading: false
    }
  },
  watch: {
    buttonHovering(newVal) {
      this.showToolTip = newVal
    },
    bid (newVal) {
      this.loading = true
      this.fetchBulletinPosts({ bulletinId: newVal}).then(() => {
        this.loading = false
      })
    }
  },
  computed: {
    ...mapGetters({
      bid: types.GET_CURRENT_BID,
      members: memberTypes.GET_MEMBERS,
      membership: memberTypes.GET_MEMBERSHIP,
      user: userTypes.GET_USER,
      bulletinPosts: types.GET_BULLETIN_POSTS,
      bulletin: types.GET_CURRENT_BULLETIN
    }),
  },
  methods: {
    ...mapActions({
      fetchMembers: memberTypes.FETCH_MEMBERS,
      fetchMembership: memberTypes.FETCH_MEMBERSHIP,
      fetchBulletinPosts: types.FETCH_BULLETIN_POSTS,
      createBulletinPost: types.CREATE_BULLETIN_POST
    }),
    ...mapMutations({
      setMembership: memberTypes.SET_MEMBERSHIP
    }),
    startAdd(): void {
      this.newMessage = ''
      this.newSubject = ''
      this.newImageUrlRec = ''
      this.newImageUrlSq = ''
      this.dialog = true
    },
    submit () {
      const mid = this.membership.id
      
      this.loading = true
      this.createBulletinPost({
        memberId: mid,
        subject: this.newSubject,
        message: this.newMessage,
        rectangleImageUrl: this.newImageUrlRec,
        squareImageUrl: this.newImageUrlSq
      }).then(() => {
        this.fetchBulletinPosts({ bulletinId: this.bid}).then(() => {
          this.loading = false
        })
      })
    }
  },
  created () {
      this.loading = true
      this.fetchBulletinPosts({ bulletinId: this.bid}).then(() => {
        this.loading = false
      })
  }
});
</script>

<style>

</style>
