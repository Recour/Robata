<template>
  <v-container fluid>
    <v-layout column align-center>
      <h1>Home</h1>
    </v-layout>
  </v-container>
</template>

<script>
import keepMeSignedInMixin from '../mixins/keepMeSignedInMixin'

  export default {
    mixins: [keepMeSignedInMixin],
    async mounted() {
      await this.keepMeSignedIn()
    }
  }
</script>