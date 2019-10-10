<template>
    <v-toolbar color="toolbar" dark app flat clipped-left dense>

        <v-toolbar-title @click="logoClicked" style="cursor: pointer;">Odash</v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- Signed In -->
        <template v-if="signedIn">
            <!-- Search -->
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn fab flat @click="searchClick" v-on="on">
                        <v-icon>search</v-icon>
                    </v-btn>
                </template>
                <span>Search</span>
            </v-tooltip>
        </template>

        <!-- Signed Out -->
        <template v-if="!signedIn">
            <!-- Sign Up -->
            <SignUpDialog/>
            
            <!-- Sign In -->
            <SignInDialog/>
        </template>
    </v-toolbar>
</template>

<style>
    a {
        text-decoration: none;
    }
</style>


<script>
import SignUpDialog from '@/components/dialogs/SignUpDialog'
import SignInDialog from '@/components/dialogs/SignInDialog'

export default {
    components: {SignUpDialog, SignInDialog},
    data() {
        return {
        }
    },
    methods: {
        // Search
       searchClick: function() {
           alert("searchClick()")
       },
       logoClicked: function() {
           this.$router.push({name: 'front'})
       }
    },
    computed: {
        signedIn() {
            return this.$store.state.signedIn
        }
    }
}
</script>

