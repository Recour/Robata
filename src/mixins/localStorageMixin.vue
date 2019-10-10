<script>
export default {
    methods: {
        // Gets token from local storage and sets it in store
        getLocalStorageAccessToken: function() {
            if(window.localStorage) {
                var token = localStorage.getItem('accessToken')

                if(token != null) {
                    return token
                }
            } else {
                console.log("localStorage is unavailable")
            }

            return null
        },
        setLocalStorageAccessToken: function(token) {
            if(window.localStorage) {
                localStorage.setItem('accessToken', token)
            } else {
                console.log("localStorage is unavailable")
            }
        }
    }
}
</script>
