<script>
import localStorageMixin from './localStorageMixin'
import tokenMixin from './tokenMixin'
import userMixin from './userMixin'

export default {
    mixins: [localStorageMixin, tokenMixin, userMixin], 
    methods : {
        keepMeSignedIn: async function() {
            // Not signed in
            if(!this.$store.state.signedIn) {
                console.log("Not signed in")

                // No access token stored in $store
                if(!this.$store.state.accessToken) {
                    console.log("No access token stored in $store")
                    var accessTokenLS = this.getLocalStorageAccessToken()

                    // No access token stored in Local Storage
                    if(!accessTokenLS) {
                        console.log("No access token stored in Local Storage")
                        this.$router.push({name: 'front'})

                    // Access token stored in Local Storage
                    } else {
                        console.log("Access token stored in Local Storage")

                        // Local Storage access token is valid
                        if(await this.verifyToken(accessTokenLS)) {
                            console.log("Local Storage access token is valid")
                            this.updateAccessToken(accessTokenLS)
                            await this.signIn()

                        // Local Storage access token is invalid
                        } else {
                            console.log("Local Storage access token is invalid")
                            this.$router.push({name: 'front'})
                        }
                    }
                // Access token stored in $store
                } else {
                    console.log("Access token stored in $store")
                    var accessTokenS = this.$store.state.accessToken

                    // $store access token is valid
                    if(await this.verifyToken(accessTokenS)) {
                        console.log("$store access token is valid")

                    // $store access token is invalid
                    } else {
                        console.log("$store access token is invalid")
                    }
                }
            
            // Signed in
            } else {
                console.log("Signed in")
            }
        }
    }
}
</script>
