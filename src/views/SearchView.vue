<template>
  <v-container fluid>
    <v-layout align-center>
      <v-flex>
        <v-text-field
          @input="autocomplete"
          v-model="query"
          placeholder="Start typing to search"
          append-icon="search"
          solo/>

        <v-list>
          <v-list-tile 
            v-for="(user, index) in this.users" 
            :key="index"
            :to="{ name: 'user-profile', params: { username: user.username } }">
            <v-list-tile-title>
              {{ user.username }}
            </v-list-tile-title>
          </v-list-tile>
        </v-list>

        <v-list
          v-if="this.users != null && this.users.length == 0">
          <v-list-tile>
            <v-list-tile-title>
              No users found
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import keepMeSignedInMixin from '@/mixins/keepMeSignedInMixin'
import apiMixin from '@/mixins/apiMixin'

  export default {
    mixins: [keepMeSignedInMixin, apiMixin],
    data() {
      return {
        query: '',
        users: null
      }
    },
    async mounted() {
      await this.keepMeSignedIn()
    },
    methods: {
      autocomplete: async function() {
        if(this.query.length >= 2) {
          this.users = await this.searchUsers(this.query)
        } else {
          this.users = null
        }
      }
    }
  }
</script>