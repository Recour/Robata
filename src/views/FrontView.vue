<template>
  <div>
    <v-parallax height="600" :src="require('@/assets/wallpaper.jpg')">
      <v-layout column align-center justify-center>
        <h1 class="display-3 font-weight-light">A platform for open data sharing.</h1>
      </v-layout>
    </v-parallax>

    <v-layout column align-center class="my-5">
      <v-flex class="my-3">
        <div class="text-xs-center">
          <h1 class="display-1">Share your data in 3 steps:</h1>
        </div>
      </v-flex>

      <v-container grid-list-xl>
        <v-layout row wrap>
          <v-flex md4>
            <v-card elevation="0">
              <v-card-text class="text-xs-center">
                <v-icon x-large>account_circle</v-icon>
              </v-card-text>

              <v-card-title class="layout justify-center">
                <div class="headline text-xs-center">Sign up</div>
              </v-card-title>
            </v-card>
          </v-flex>

          <v-flex md4>
            <v-card elevation="0">
              <v-card-text class="text-xs-center">
                <v-icon x-large>apps</v-icon>
              </v-card-text>

              <v-card-title class="layout justify-center">
                <div class="headline text-xs-center">Create data profiles</div>
              </v-card-title>
            </v-card>
          </v-flex>

          <v-flex md4>
            <v-card elevation="0">
              <v-card-text class="text-xs-center">
                <v-icon x-large>router</v-icon>
              </v-card-text>

              <v-card-title class="layout justify-center">
                <div class="headline text-xs-center">Upload data</div>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </div>
</template>


<script>
import keepMeSignedInMixin from '../mixins/keepMeSignedInMixin'

export default {
  mixins: [keepMeSignedInMixin],
  async mounted() {
    await this.keepMeSignedIn()
    if(this.signedIn) {
      this.$router.push({name: 'home'})
    }
  },
  computed: {
    signedIn() {
      return this.$store.state.signedIn
    }
  }
}
</script>