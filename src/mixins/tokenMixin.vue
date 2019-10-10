<script>
import localStorageMixin from './localStorageMixin'

export default {
    mixins: [localStorageMixin],
    methods: {
        updateAccessToken: function(token) {
            this.setLocalStorageAccessToken(token)
            this.$store.commit('setAccessToken', token)
            this.$http.defaults.headers.common['Authorization'] = "Bearer " + token
        }
    }
}
</script>
