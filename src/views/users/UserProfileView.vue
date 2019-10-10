<template>
    <v-container>
        <v-layout>
            <v-flex 
                v-if="userInfo"
                xs12>
                <v-card>
                    <v-card-title>
                        <v-list-tile 
                            avatar>
                            <v-list-tile-avatar>
                                <img :src="'http://localhost:7000' + userInfo.userprofile.image">
                            </v-list-tile-avatar>
                        </v-list-tile>
                        
                        <v-list-tile-content class="display-1">
                            {{ userInfo.username }}
                        </v-list-tile-content>
                    </v-card-title>

                    <v-card-text>
                        {{ userInfo.follows.length }} followers
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout>
            <v-flex
                xs12 sm6 md4
                v-for="dataProfile in this.userDataProfiles" 
                :key="dataProfile.id">
                <DataProfileCard :dataProfile="dataProfile"/>
            </v-flex>

            <v-flex v-if="userDataProfiles != null && userDataProfiles.length == 0">
                This user does not have any datasets.
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import keepMeSignedInMixin from '@/mixins/keepMeSignedInMixin'
import apiMixin from '@/mixins/apiMixin'
import DataProfileCard from '@/components/cards/DataProfileCard'

export default {
    mixins: [keepMeSignedInMixin, apiMixin],
    components: {DataProfileCard},
    async mounted() {
        await this.keepMeSignedIn()
        await this.fetchData()
    },
    data() {
        return {
            userInfo: null,
            userDataProfiles: null
        }
    },
    methods: {
        fetchData: async function() {
            this.userInfo = await this.fetchUserInfo(this.$route.params.username)
            this.userDataProfiles = await this.fetchDataProfiles(this.$route.params.username)
        }
    }
}
</script>