<script>
import tokenMixin from './tokenMixin'
import { DJANGO_ENDPOINTS } from '../config.js'
import { bus } from '../main'

export default {
    mixins: [tokenMixin],
    methods: {
        // ### USER API CALLS ###
        // Returns true if successful, status code if unsuccessful
        createUser: async function(username, email, password) {
            var created = false

            const instance = this.$http.create()
            instance.interceptors.response.use((response) => {

                if(response.status == 201) {
                    created = true
                }

            }, (error) => {

                if(error.response.status == 400) {
                    bus.$emit('showSnackbar', {
                        text: 'This username is already in use', color: 'error', timeout: 4000
                    })
                    
                } else {
                    bus.$emit('showSnackbar', {
                        text: 'An unexpected error occurred while creating your account', color: 'error', timeout: 4000
                    })
                }
            })

            var data = {
                username: username,
                email: email,
                password: password
            }
            
            await instance.post(DJANGO_ENDPOINTS.USERS, data)

            return created
        },
        // Returns userInfo object if successful, null if unsuccessful
        fetchSignedInUserInfo: async function() {
            var userInfo = null

            const instance = this.$http.create()
            instance.interceptors.response.use((response) => {
                if(response.status == 200) {
                    userInfo = response.data
                }

                return response
            })

            await instance.get(DJANGO_ENDPOINTS.USERS)

            return userInfo
        },
        // Returns list of user objects if successful, null if unsuccessful
        searchUsers: async function(query) {
            var result = null

            const instance = this.$http.create()
            instance.interceptors.response.use((response) => {
                if(response.status == 200) {
                    result = response.data
                }

                return response
            })

            var data = {
                params: {
                    search: query
                }
            }

            await instance.get(DJANGO_ENDPOINTS.USERS_SEARCH, data)

            return result
        },
        fetchUserInfo: async function(username) {
            var userInfo = null

            const instance = this.$http.create()
            instance.interceptors.response.use((response) => {
                if(response.status == 200) {
                    userInfo = response.data
                }

                return response
            })

            var url = DJANGO_ENDPOINTS.USERS_DETAIL.replace('<username>', username)

            await instance.get(url)

            return userInfo
        },

        // ### TOKEN API CALLS ###
        // Returns token object if successful, null if unsuccessful
        requestToken: async function(username, password) {
            var token = null

            const instance = this.$http.create()
            instance.interceptors.response.use((response) => {
                if(response.status == 200) {
                    token = response.data
                }

                return response

            }, (error) => {
                if(!error.response) {
                    bus.$emit('showSnackbar', {
                        text: 'A network error occurred', color: 'error', timeout: 3000
                    })

                } else if(error.response.status == 401) {
                    bus.$emit('showSnackbar', {
                        text: 'Invalid username or password', color: 'error', timeout: 3000
                    })

                } else {
                    bus.$emit('showSnackbar', {
                        text: 'An unexpected error occurred', color: 'error', timeout: 3000
                    })
                }
            })

            var data = {
                username: username,
                password: password
            }

            await instance.post(DJANGO_ENDPOINTS.TOKEN, data)

            return token
        },
        // Returns true if valid, false if not valid
        verifyToken: async function(token) {
            var success = false

            const instance = this.$http.create()
            instance.interceptors.response.use((response) => {
                if(response.status == 200) {
                    success = true
                }

                return response
            })

            var data = {
                token: token
            }

            await instance.post(DJANGO_ENDPOINTS.TOKEN_VERIFY, data)

            return success
        },

        // ### DATA PROFILE API CALLS ###
        // Returns data profiles if successful, null if unsuccessful
        fetchDataProfiles: async function(username) {
            var dataProfiles = null

            const instance = this.$http.create()
            instance.interceptors.response.use((response) => {
                if(response.status == 200) {
                    dataProfiles = response.data
                }

                return response
            })

            var data = {
                params: {
                    username: username
                }
            }

            await instance.get(DJANGO_ENDPOINTS.DATAPROFILES, data)

            return dataProfiles
        },
        // Returns true if successful, false if unsuccessful
        createDataProfile: async function(name, description) {
            var success = false
            
            const instance = this.$http.create()
            instance.interceptors.response.use((response) => {
                if(response.status == 201) {
                    success = true
                    bus.$emit('showSnackbar', {
                        text: 'Data profile ' + name + ' was created successfully!', color: '', timeout: 4000
                    })
                }

                return response
            })

            var data = {
                name: name,
                description: description
            }

            await instance.post(DJANGO_ENDPOINTS.DATAPROFILES, data)

            return success
        },
        // Returns true if successful, false if unsuccessful
        updateDataProfile: async function(id, name, description) {
            var success = false

            const instance = this.$http.create()
            instance.interceptors.response.use((response) => {
                if(response.status == 200) {
                    success = true
                    bus.$emit('showSnackbar', {
                        text: 'You updated ' + name + '!', color: '', timeout: 4000
                    })
                }
                
                return response
            })

            var data = {
                name: name,
                description: description
            }

            var URL_DATAPROFILE_UPDATE = DJANGO_ENDPOINTS.DATAPROFILES + id + '/'

            await instance.patch(URL_DATAPROFILE_UPDATE, data)

            return success
        },
        // Returns true if successful, false if unsuccessful
        deleteDataProfile: async function(id, name) {
            var success = false

            const instance = this.$http.create()
            instance.interceptors.response.use((response) => {
                if(response.status == 204) {
                    success = true
                    bus.$emit('showSnackbar', {
                        text: name + ' was removed from your data.', color: '', timeout: 4000
                    })
                }

                return response
            })

            var URL_DATAPROFILE_DELETE = DJANGO_ENDPOINTS.DATAPROFILES + id + '/'

            await instance.delete(URL_DATAPROFILE_DELETE)

            return success
        }
    }
}
</script>
