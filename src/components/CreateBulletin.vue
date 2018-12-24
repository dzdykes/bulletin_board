<template>
  <v-card>
    <v-img
      v-if="b.rectangleImageUrl"
      :src="b.rectangleImageUrl"
      aspect-ratio="2.75"
    ></v-img>
    <v-card v-else class="py-5 ma-auto" flat hover @click="startAdd({ title: 'Large Rectangle Image', value: '', name: 'rectangleImageUrl', label: 'Enter valid image url.' })">
      <v-layout column fill-height align-center>
        <v-flex>
          <v-icon x-large>
            add_photo_alternate
          </v-icon>
        </v-flex>
        <v-flex>
          <div class="text-xs-center headline grey--text text--darken-3">
            Add Picture
          </div>
        </v-flex>
      </v-layout>
    </v-card>
    
    <v-card-title>
      <h3 v-if="bulletin.name" class="headline mb-0">{{ b.name }}</h3>
      <v-btn
        flat
        large
        block
        outline
        v-else
        @click="startAdd({ title: 'Bulletin Name', value: '', name: 'name', label: 'Enter a name.' })"
        class="teal--text text--darken-3"
      >
        <v-icon left>add_circle</v-icon>
        Add a Name for your Bulletin
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-layout>
        <v-flex xs5>
          <v-img
            :src="b.squareImageUrl"
            aspect-ratio="1"
            v-if="b.squareImageUrl"
          ></v-img>
          <v-card v-else 
            class="py-5 ma-auto"
            flat
            hover
            @click="startAdd({ title: 'Square Rectangle Image', value: '', name: 'squareImageUrl', label: 'Enter valid image url.' })"
            width="200px"
            height="200px"
          >
            <v-layout column fill-height align-center>
              <v-flex>
                <v-icon x-large>
                  add_photo_alternate
                </v-icon>
              </v-flex>
              <v-flex>
                <div class="text-xs-center headline grey--text text--darken-3">
                  Add Picture
                </div>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex xs7>
          <v-layout column justify-center align-center fill-height>
            <div v-if="b.description" class="body-2 px-1">{{ b.description }}</div>
            <v-btn
              flat
              large
              outline
              v-else
              @click="startAdd({ title: 'Bulletin Descrition', value: '', name: 'description', label: 'Enter a description.', textarea: true })"
              class="teal--text text--darken-3"
            >
              <v-icon left>add_circle</v-icon>
              Add description
            </v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-text>

    <v-card-actions>
      <v-btn small class="outline blue--text text--lighten-1" @click="reset" ouline flat>
        <span class="caption">Reset</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn small class="outline blue lighten-1 grey--text text--lighten-3" dark flat @click="validateAndCreate">
        <span class="caption">Finish and Create</span>
      </v-btn>
    </v-card-actions>
    <v-dialog
      v-model="dialog"
      width="390px"
    >
      <v-card>
        <v-card-title class="headline">
          Editing {{ currentProp.title }}
        </v-card-title>
        <v-card-text>
          <v-textarea
            v-if="currentProp.textarea"
            :label="currentProp.label"
            v-model="currentProp.value"
            box        
            :rules="currentProp.rules"
          >

          </v-textarea>
          <v-text-field
            :label="currentProp.label"
            v-model="currentProp.value"
            v-else
            box        
            :rules="currentProp.rules"
          >
          </v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-0">
          <v-btn block large class="blue lighten-1" @click="editProp(currentProp.name, currentProp.value)">
            <span class="grey--text text--lighten-3">Done</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import * as bulletinsTypes from '../store/bulletins-types';
import * as types from '../store/user-types';

export default Vue.extend({
  name: 'createbulletin',
  props: {
    creatorEmail: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      bulletin: {
        bulletinId: '',
        bulletinProfileId: '',
        createDate: '',
        description: '',
        name: '',
        rectangleImageUrl: '',
        squareImageUrl: '',
        updateDate: ''
      },
      currentProp: {
        name: '',
        value: '',
        rules: []
      },
      dialog: false
    }
  },
  computed: {
    ...mapGetters({
      currentBid: bulletinsTypes.GET_BULLETINS
    }),
    b(): any  {
      return this.bulletin || {}
    }
  },
  methods: {
    startAdd(prop: any) {
      this.currentProp = prop
      this.dialog = true
    },
    editProp(propName: string, value: any) {
      const bulletin: any = this.bulletin
      bulletin[propName] = value
      this.dialog = false
    },
    validateAndCreate () {
      this.$store.dispatch(bulletinsTypes.CREATE_BULLETINS, {
        email: this.creatorEmail,
        name: this.bulletin.name,
        description: this.bulletin.description,
        rectangleImageUrl: this.bulletin.rectangleImageUrl,
        squareImageUrl: this.bulletin.squareImageUrl
      }).then(() => {
        this.$router.push({ name: 'bulletins' })
      })
    },
    reset () {
      this.bulletin = {
        bulletinId: '',
        bulletinProfileId: '',
        createDate: '',
        description: '',
        name: '',
        rectangleImageUrl: '',
        squareImageUrl: '',
        updateDate: ''
      }
    }
  }
})
</script>

<style>

</style>
