<template>
  <v-container fluid>
    <LoadingDialog/>

    <!-- Top row -->
    <v-layout>
      <v-flex xs12>
        <!-- Add Data Profile fab -->
        <CreateDataProfileDialog/>
      </v-flex>
      <EditDataProfileDialog ref="editDataProfileDialog"/>
    </v-layout>

    <!-- Middle row -->
    <v-layout wrap>
      <v-flex v-if="this.dataProfiles == 0">
        You don't have any datasets yet.
      </v-flex>

      <!-- Data Profiles -->
      <v-flex 
        xs12 sm6 md4 
        v-for="dataProfile in this.dataProfiles" 
        :key="dataProfile.id">
        <DataProfileCard :dataProfile="dataProfile"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import keepMeSignedInMixin from '@/mixins/keepMeSignedInMixin'
import apiMixin from '@/mixins/apiMixin'
import DataProfileCard from '@/components/cards/DataProfileCard'
import CreateDataProfileDialog from '@/components/dialogs/CreateDataProfileDialog'
import EditDataProfileDialog from '@/components/dialogs/EditDataProfileDialog'
import LoadingDialog from '@/components/dialogs/LoadingDialog'
import { bus } from '@/main'

  export default {
    mixins: [keepMeSignedInMixin, apiMixin],
    components: {DataProfileCard, CreateDataProfileDialog, EditDataProfileDialog, LoadingDialog},
    data() {
      return {
        dataProfiles: null
      }
    },
    async mounted() {
      await this.keepMeSignedIn()
      await this.refreshDataProfiles()
    },
    methods: {
      refreshDataProfiles: async function() {
        this.$store.commit('setLoading', true)

        this.dataProfiles = await this.fetchDataProfiles(this.$store.state.userInfo.username)

        this.$store.commit('setLoading', false)
      }
    },
    created() {
      bus.$on('refreshDataProfilesEvent', () => {
        this.refreshDataProfiles()
      }),
      bus.$on('openEditDataProfileDialogEvent', (dataProfile) => {
        this.$refs.editDataProfileDialog.openDialog(dataProfile)
      })
    }
  }
</script>