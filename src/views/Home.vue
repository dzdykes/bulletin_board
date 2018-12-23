<template>
  <v-container class="home" grid-list-lg>
    <v-layout row wrap>
      <v-flex class="mx-auto" xs12 sm6 md4 lg3>
        <v-card>
          <v-card-title class="headline">
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
            <span class="body-1">Already a Member? <router-link :to="{ name: 'bulletin' }">Sign In</router-link></span>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="pa-0">
            <v-btn block large class="blue lighten-1" @click="submit">
              <span class="grey--text text--lighten-3">Become a Member</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'home',
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
  components: {
  },
  methods: {
    submit () {
      this.validateEmail = true
    }
  }
});
</script>
