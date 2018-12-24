<template>
  <v-container class="home" grid-list-lg>
      <v-layout>
        <v-flex mx-auto xs12 sm6 md4>
          <create-bulletin :creator-email="user.email"></create-bulletin>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateBulletin from '@/components/CreateBulletin.vue'
import { mapGetters } from 'vuex'
import * as userTypes from '@/store/user-types';

export default Vue.extend({
  name: 'create',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      user: userTypes.GET_USER,
    })
  },
  components: {
    CreateBulletin,
  }
});
</script>
