<template>
    <v-dialog v-model="dialogSignUp" width="300px">
        <!-- Sign Up button -->
        <v-btn flat round slot="activator" class="text-capitalize">
            Sign Up
        </v-btn>

        <!-- Dialog Card -->
        <v-card style="border-radius: 15px;" elevation="24">
            <v-container>
                <v-card-title>
                    <h1>Sign Up</h1>
                </v-card-title>

                <v-divider></v-divider>
                
                <v-card-text>
                    <!-- Sign Up form -->
                    <v-form ref="signUpForm">
                        <v-text-field 
                        v-model="username" 
                        label="Username" :counter="20" clearable outline
                        v-validate="'required|min:4|max:20|alpha_num'"
                        :error-messages="errors.first('username')"
                        name="username"/>

                        <v-text-field 
                        v-model="email" 
                        label="E-mail" clearable outline
                        v-validate="'required|email'"
                        :error-messages="errors.first('e-mail')"
                        name="e-mail"/>

                        <v-text-field 
                        v-model="password"
                        type="password" label="Password" clearable outline
                        v-validate="'required'"
                        :error-messages="errors.first('password')"
                        name="password"
                        ref="password"/>

                        <v-text-field
                        v-model="password_confirmation"
                        type="password" label="Password confirmation" clearable outline
                        v-validate="'required|confirmed:password'"
                        :error-messages="errors.first('password_confirmation')"
                        name="password_confirmation"
                        data-vv-as="password"/>
                    </v-form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <!-- Submit button -->
                    <v-spacer></v-spacer>
                    <v-btn flat round @click="submit" :loading="$store.state.loading">Sign Up</v-btn>
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
            dialogSignUp: false,
            username: '',
            email: '',
            password: '',
            password_confirmation: '',
            errorAlert: { show: false, text: '' }
        }
    },
    methods: {
        submit: async function() {
            console.log("Submit clicked")

            this.$store.commit('setLoading', true)

            var dataIsValid = false

            await this.$validator.validate()
            // Valid form
            .then(valid => {
                console.log("Form is valid")
                dataIsValid = true
            })

            // Data is valid
            if(dataIsValid == true) {
                console.log("dataIsValid is true")
                // Account created
                if(await this.createUser(this.username, this.email, this.password)) {
                    console.log("Account created")
                    var token = await this.requestToken(this.username, this.password)

                    if(token != null) {
                        console.log("Token not null")
                        this.updateAccessToken(token.access)
                        await this.signIn()
                        this.$router.push({name: 'home'})
                    }
                }
            }

            this.$store.commit('setLoading', false)
        }
    }
}
</script>