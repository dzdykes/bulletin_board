<template>
  <v-container class="home" grid-list-lg>
      <v-layout>
        <v-flex xs12 sm4>  
          <v-text-field
            prepend-inner-icon="search"
            solo
            v-model="search"
          >

          </v-text-field>
        </v-flex>
      </v-layout>
      <v-data-iterator
      :items="bulletins"
      :rows-per-page-items="[bulletins.length || 10]"
      :search="search"
      content-tag="v-layout"
      row
      wrap
    >
      <v-flex
        slot="item"
        slot-scope="props"
        xs12
        sm6
        md4
        lg3
      >
        <bulletin :bulletin="props.item" @join="joinBulletin($event)"></bulletin>
      </v-flex>
    </v-data-iterator>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Bulletin from '@/components/Bulletin.vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import * as types from '../store/bulletins-types'

export default Vue.extend({
  name: 'allbulletins',
  data () {
    return {
      search: ''
    }
  },
  components: {
    Bulletin,
  },
  computed: {
    ...mapGetters({
      bulletins: types.GET_BULLETINS
    })
  },
  methods: {
    ...mapActions({
      fetchBulletins: types.FETCH_BULLETINS
    }),
    ...mapMutations({
      setBid: types.SET_CURRENT_BID
    }),
    joinBulletin (bid: string) {
      this.setBid(bid)
      this.$router.push({ name: 'join' })
    }
  },
  created() {
    this.fetchBulletins()
  }
});
</script>
