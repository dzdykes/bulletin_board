<template>
  <v-container class="home" grid-list-lg>
    <v-layout row wrap>
      <template v-for="b in bulletins">
        <v-flex :key="b.bulletinId" xs12 sm6 md4 lg3>
          <v-card>
            <v-img
              :src="b.rectangleImageUrl"
              aspect-ratio="1.75"
            ></v-img>
            
            <v-card-title primary-title>
              <h3 class="headline mb-0">{{ b.name }}</h3>
            </v-card-title>

            <v-card-text>
              <span class="subheading">{{ b.description }}</span>
            </v-card-text>
          </v-card>
        </v-flex>
      </template>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { mapGetters, mapActions } from 'vuex'
import * as types from '../store/bulletins-types'

export default Vue.extend({
  name: 'home',
  components: {
    HelloWorld,
  },
  computed: mapGetters({
    bulletins: types.GET_BULLETINS
  }),
  methods: {
    ...mapActions({
      fetchBulletins: types.FETCH_BULLETINS
    })
  },
  created () {
    this.fetchBulletins()
  }
});
</script>
