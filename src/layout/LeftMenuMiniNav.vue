<template>
  <v-navigation-drawer
    mini-variant
    v-model="drawer"
    absolute
    temporary
  >
    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile
        v-for="item in items"
        :key="item.title"
        :to="{ name: item.routeName }"
        exact
      >
        <v-list-tile-action>
          <v-tooltip right>
            <v-icon slot="activator">{{ item.icon }}</v-icon>
            <span>{{ item.title }}</span>
          </v-tooltip>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'MiniNav',
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      drawer: false,
      items: [
        { title: 'Home', icon: 'home', routeName: 'home' },
        { title: 'Bulletins', icon: 'dashboard', routeName: 'bulletins' }
      ],
      mini: true,
      right: null
    }
  },
  watch: {
    open (newVal) {
      this.drawer = newVal
    },
    drawer (newVal) {
      if (!newVal) {
        this.$emit('update:open', false)
      }
    }
  }
}
</script>

<style>

</style>
