<template>
    <v-dialog v-model="dialogSignIn" width="300px">
        <!-- Sign In button -->
        <v-btn flat round slot="activator" class="text-capitalize">
            Sign In
        </v-btn>

        <!-- Dialog Card -->
        <v-card style="border-radius: 15px;" elevation="24">
            <v-container>
                <v-card-title>
                    <h1>Sign In</h1>
                </v-card-title>

                <v-divider></v-divider>

                <v-card-text>
                    <!-- Form (Sign In) -->
                    <v-form>
                        <v-text-field outline clearable v-model="username" label="Username"></v-text-field>
                        <v-text-field outline clearable v-model="password" type="password" label="Password"></v-text-field>
                    </v-form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <!-- Submit button -->
                    <v-spacer></v-spacer>
                    <v-btn flat round @click="submit" :loading="loading">Sign In</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
import apiMixin from '@/mixins/apiMixin'
import userMixin from '@/mixins/userMixin'

export default {
    mixins: [apiMixin, userMixin],
    data() {
        return {
            dialogSignIn: false,
            username: '',
            password: '',
            errorAlert: { show: false, text: '' },
            loading: false
        }
    },
    methods: {
        submit: async function() {
            this.loading = true

            var token = await this.requestToken(this.username, this.password)

            if(token != null) {
                this.updateAccessToken(token.access)
                await this.signIn()
                this.$router.push({name: 'home'})
            }

            this.loading = false
        }
    }
}
</script>
