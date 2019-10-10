<template>
    <v-card color="#405040" dark flat class="ma-2">
        <v-card-title>
        <span class="headline font-weight-bold text-xs-center" style="font-size: 150%;">{{ dataProfile.name }}</span>
        </v-card-title>

        <template v-if="dataProfile.description">
        <v-divider></v-divider>

        <v-card-text>
            <span class="font-weight-light">{{ dataProfile.description }}</span>
        </v-card-text>
        </template>

        <v-divider></v-divider>

        <v-card-actions>
            <v-card-text class="caption">
                last updated {{ showLastUpdated(dataProfile.last_update) }}
            </v-card-text>

            <v-spacer></v-spacer>

            <template v-if="dataProfile.owner.id == $store.state.userInfo.id">
                <!-- Activator fab -->
                <v-tooltip bottom slot="activator">
                    <template v-slot:activator="{ on }">
                        <v-btn @click="editDataProfileEvent" fab flat v-on="on" slot="activator">
                            <v-icon>settings</v-icon>
                        </v-btn>
                    </template>
                    <span>Settings</span>
                </v-tooltip>
            </template>
        </v-card-actions>
    </v-card>
</template>


<script>
import { bus } from '@/main'

export default {
    props: ['dataProfile'], 
    methods: {
        amountOfSecondsSinceLastUpdate: function(datetimeObj) {
            var lastUpdated = new Date(datetimeObj)
            var lastUpdatedMs = Date.parse(lastUpdated)
            var nowMs = Date.now()
            return Math.round((nowMs - lastUpdatedMs) / 1000)
        },
        showLastUpdated: function(dateTimeObj) {
            var seconds = this.amountOfSecondsSinceLastUpdate(dateTimeObj)
            var minutes = Math.floor(seconds / 60)
            var hours = Math.floor(minutes / 60)
            var days = Math.floor(hours / 24)

            if(seconds < 60) {
            return seconds + " second(s) ago"
            } else if(seconds >= 60 && seconds < 3600) {
            return minutes + " minute(s) ago"
            } else if(seconds >= 3600 && seconds < 86400) {
            return hours + " hour(s) ago"
            } else {
            return days + " day(s) ago"
            }
        }, 
        editDataProfileEvent: function() {
            bus.$emit('openEditDataProfileDialogEvent', this.dataProfile)
        }
    }
}
</script>
