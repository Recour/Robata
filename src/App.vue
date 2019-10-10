<template>
  <v-app style="background: #FFFFFF;">
    <Toolbar v-if="!signedIn"/>

    <NavigationDrawer v-if="signedIn"/>

    <v-content>
      <router-view/>
    </v-content>

    <v-snackbar top v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout" class="text-xs-center">
      {{ snackbar.text }}
    </v-snackbar>

    <Footer/>
  </v-app>
</template>

<script>
import Footer from '@/components/core/Footer'
import Toolbar from '@/components/core/Toolbar'
import NavigationDrawer from '@/components/core/NavigationDrawer'
import { bus } from './main'

export default {
  name: 'App',
  components: {
    Toolbar,
    Footer,
    NavigationDrawer
  },
  data () {
    return {
      snackbar: {
        show: false, text: '', color: '', timeout: null
      }
    }
  },
  created() {
    bus.$on('showSnackbar', (snackbarSettings) => {
      this.snackbar.text = snackbarSettings.text
      this.snackbar.color = snackbarSettings.color
      this.snackbar.timeout = snackbarSettings.timeout
      this.snackbar.show = true
    })
  },
  computed: {
    signedIn() {
      return this.$store.state.signedIn
    }
  }
}
</script>
