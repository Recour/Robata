<script>
export default {
    created: function() {
        if(!this.signedIn) {
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