<template>
    <v-navigation-drawer 
        v-model="navigationDrawer" 
        app 
        dark
        flat
        permanent
        clipped 
        width="230">
        <v-img
            src="https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            gradient="rgba(0, 15, 0, 1), rgba(0, 0, 0, 1)"
            height="100%">
            <v-layout
                column
                fill-height>       
                <v-flex
                    sm1
                    class="mt-5 ml-4 white--text font-weight-bold display-3">
                        Odash
                </v-flex>
                
                <v-list dense class="ma-3">
                    <v-list-tile 
                        v-for="(option, index) in navigationOptions" 
                        :key="index" 
                        :to="option.route"
                        class="mt-2 mb-2 grey--text"
                        active-class="font-weight-bold white--text">
                        <v-list-tile-action>
                            <v-icon>{{ option.icon }}</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title class="font-weight-light">
                                {{ option.text }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>                    
                </v-list>

                <v-spacer></v-spacer>

                <v-list>
                    <v-list-tile>
                        <v-btn
                            @click="signOut"
                            block
                            flat
                            large
                            class="grey--text font-weight-light">
                            Sign Out
                        </v-btn>
                    </v-list-tile>
                </v-list>
            </v-layout>
        </v-img>
    </v-navigation-drawer>
</template>

<style>
    .v-list__tile {
        border-radius: 5px;
    }
    
     /* .unactive-tile {
        color: #B3B3B3;
    } */

    .theme--dark.v-icon {
        color: grey;
    }

    /* .v-list__tile--active .v-list__tile__content {
        color: white;
    }

    .v-list__tile--active .v-list__tile__content .v-list__tile__title {
        font-weight: bold;
    }


    .v-list__tile--active .v-list__tile__action {
        color: white;
    }  */
</style>


<script>
import userMixin from "@/mixins/userMixin"

export default {
    mixins: [userMixin],
    data() {
        return {
            navigationOptions: [
                { 
                    text: 'Home', 
                    icon: 'home', 
                    route: {name: 'home'} 
                },
                { 
                    text: 'My Data', 
                    icon: 'wifi', 
                    route: {name: 'my-data'} 
                },
                { 
                    text: 'Search', 
                    icon: 'search', 
                    route: {name: 'search'}
                }
            ],
            navigationDrawer: true
        }
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo
        }
    }
}
</script>