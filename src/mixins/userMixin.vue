<script>
import tokenMixin from './tokenMixin'
import apiMixin from './apiMixin'

export default {
    mixins: [tokenMixin, apiMixin],
    methods: {
        // Returns true if successful, false if unsuccessful
        signIn: async function() {
            this.$store.commit('setSignedIn', true)

            var userInfo = await this.fetchSignedInUserInfo()

            if(userInfo != null) {
                this.$store.commit('setUserInfo', userInfo)
            }

            console.log("$store.state.userInfo: " + this.$store.state.userInfo)
        },
        signOut: function() {
            if(window.localStorage) {
                localStorage.removeItem('accessToken')
            }

            this.$store.commit('resetState')
            this.$router.push({name: 'front'})
        }
    }
}
</script>
