<template>
  <v-card class="elevation-20">
    <v-card-title class="headline blue darken-4 blue-grey--text text--lighten-5">
      Welcome to Bulletin Board!
    </v-card-title>
    <v-card-text>
      <v-text-field
        label="Email Address"
        v-model="email"
        box        
        :rules="validateEmail ? emailRules : []"
        required
      >

      </v-text-field>
      <span class="body-1">Already a Member? <router-link :to="{ name: 'bulletins' }">Sign In</router-link></span>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="pa-0">
      <v-btn block large class="blue darken-2" @click="submit">
        <span class="blue-grey--text text--lighten-5">Find A Bulletin</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import * as types from '../store/user-types';

export default Vue.extend({
  name: 'createuser',
  data () {
    return {
      email: '',
      emailRules: [
        (v: any) => !!v || 'E-mail is required',
        (v: any) => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      validateEmail: false
    }
  },
  watch: {
    email (newVal: any) {
      if (!newVal) {
        this.validateEmail = false
      }
    }
  },
  computed: {
    ...mapGetters({
      hasCreatedUser: types.GET_HASCREATEDUSER
    })
  },
  methods: {
    ...mapActions({
      createUser: types.CREATE_USER,
      fetchUser: types.FETCH_USER
    }),
    submit () {
      const email = this.email
      let isValid = true

      this.validateEmail = true
      this.emailRules.forEach((v) => {
        if (v(email) !== true) {
          isValid = false
        }
      })
      if (isValid) {
        this.createUser(email)
          .then(() => this.fetchUser({ email }))
      }
    }
  }
});
</script>
