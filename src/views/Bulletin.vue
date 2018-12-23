<template>
  <v-container grid-list-lg>
    <v-layout wrap row>
      <v-flex xs12 sm6 md4 lg3 v-for="(b, i) in bulletinPosts" :key="i.subject + i" xs4>
        <v-card>
          <v-img
            :src="b.imageUrl"
            aspect-ratio="2.75"
          ></v-img>
          <v-card-title>
            <span class="headline text-xs-left mb-0">{{ b.subject }}</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="removeBulletinPost(b.id)">
              <v-icon>
                more_vert
              </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <div>
              <div>{{ b.message }}</div>
              <div class="caption">Likes: {{ b.likes }}</div>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn block flat color="orange" @click="b.addLike()">Like</v-btn>
            <v-btn block flat color="Blue" @click="b.removeLike()">DisLike</v-btn>
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
                label="Image Url"
                v-model="newImageUrl"
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
                @click="addBulletinPost({ subject: newSubject, message: newMessage, imageUrl: newImageUrl }); dialog = false"
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
import { mapGetters, mapMutations } from 'vuex'

export default Vue.extend({
  name: 'bulletin-section',
  data () {
    return {
      dialog: false,
      likeAdded: false,
      newMessage: '',
      newImageUrl: '',
      newSubject: '',
    }
  },
  watch: {
    buttonHovering(newVal) {
      this.showToolTip = newVal
    }
  },
  computed: {
    ...mapGetters([
      'bulletinPosts',
    ])
  },
  methods: {
    ...mapMutations([
      'addBulletinPost',
      'removeBulletinPost',
    ]),
    startAdd(): void {
      this.newMessage = ''
      this.newSubject = ''
      this.newImageUrl = ''
      this.dialog = true
    }
  }
});
</script>

<style>

</style>
