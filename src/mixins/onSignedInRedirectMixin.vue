<script>
export default {
    mounted() {
        if(this.signedIn) {
            this.$router.push({name: 'home'})
        }
    },
    computed: {
        signedIn() {
            return this.$store.state.signedIn
        }

    }
}
</script>
