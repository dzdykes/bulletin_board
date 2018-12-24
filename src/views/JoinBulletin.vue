<template>
  <pre>
    {{ members }}
  </pre>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import * as memberTypes from '@/store/member-types'
import { GET_CURRENT_BID } from '@/store/bulletins-types';

export default {
  name: 'JoinBulletin',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters({
      bid: GET_CURRENT_BID,
      members: memberTypes.GET_MEMBERS
    })
  },
  watch: {
    bid (newVal) {
      this.fetchMembers(newVal)
    }
  },
  methods: {
    ...mapActions({
      fetchMembers: memberTypes.FETCH_MEMBERS
    })
  },
  created () {
    const bid = this.bid
    if (bid) {
      this.fetchMembers(bid)
    }
  }

}
</script>

<style>

</style>
