<template>
  <v-card>
    <v-img
      :src="b.rectangleImageUrl"
      aspect-ratio="2.75"
    ></v-img>
    
    <v-card-title>
      <h3 class="headline mb-0">{{ b.name }}</h3>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>
          more_vert
        </v-icon>
      </v-btn>
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
      <div class="caption">{{ `Updated: ${b.updateDate}`}}</div>
      <v-spacer></v-spacer>
      <v-btn small class="outline blue lighten-1 grey--text text--lighten-3" dark flat>
        <span class="caption">View Board</span>
      </v-btn>
    </v-card-actions>
  </v-card>  
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'home',
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
  }
})
</script>

<style>

</style>
