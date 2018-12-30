<template>
  <v-card v-if="$vuetify.breakpoint.smAndUp">
    <v-img
      :src="b.rectangleImageUrl"
      aspect-ratio="2.75"
    ></v-img>
    
    <v-card-title>
      <h3 class="headline mb-0">{{ b.name }}</h3>
    </v-card-title>

    <v-card-text>
      <v-layout>
        <v-flex xs5 :order-xs2="reverse">
          <v-img
            :src="b.squareImageUrl"
            aspect-ratio="1"
          ></v-img>
        </v-flex>
        <v-flex xs7>
          <v-layout column justify-center align-center fill-height>
            <div class="body-2 px-1">{{ b.description }}</div>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-text>

    <v-card-actions>
      <div class="caption">{{ `Created: ${b.createDate}`}}</div>
      <v-spacer></v-spacer>
      <v-btn small class="outline blue lighten-1 grey--text text--lighten-3" dark flat @click="joinBulletin(b.bulletinId)">
        <span class="caption">Join Bulletin</span>
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-list class="elevation-1 py-0 blue lighten-5" v-else three-line>
    <v-list-group>
      <v-list-tile slot="activator">
        <v-list-tile-avatar
          class="pl-0"
          size="40"
          tile
        >
          <v-avatar
            size="450"
          >  
            <v-img
              :src="b.rectangleImageUrl"
              aspect-ratio="1"
            ></v-img>
          </v-avatar>
        </v-list-tile-avatar>
        <v-list-tile-title>
          <span class="px-1 mr-5 body-2 grey lighten-4">{{ b.name }}</span>
        </v-list-tile-title>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <div>
            {{ b.description}}
          </div>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-spacer></v-spacer>
        <v-list-tile-action>
          <v-btn class="outline blue lighten-1 grey--text text--lighten-3" dark flat @click="joinBulletin(b.bulletinId)">
            Join
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list-group>
  </v-list> 
</template>

<script lang="ts">
import Vue from 'vue';
import * as bulletinsTypes from '../store/bulletins-types';
import { mapActions } from 'vuex'

export default Vue.extend({
  name: 'Bulletin',
  props: {
    bulletin: {
      type: Object,
      required: true
    },
    reverse: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    b(): any  {
      return this.bulletin || {}
    }
  },
  methods: {
    joinBulletin(bid: string) {
      this.$emit('join', bid)
    }
  }
})
</script>

<style>

</style>
