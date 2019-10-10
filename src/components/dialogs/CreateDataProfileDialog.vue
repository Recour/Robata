<template>
    <div>
        <v-dialog v-model="dialogCreateDataProfile" persistent max-width="600px">
            <!-- Activator fab -->
            <v-tooltip bottom slot="activator">
                <template v-slot:activator="{ on }">
                    <v-btn fab flat v-on="on" slot="activator">
                        <v-icon>add</v-icon>
                    </v-btn>
                </template>
                <span>New dataset</span>
            </v-tooltip>

            <!-- Dialog Card -->
            <v-card>
                <v-card-title>
                    <h1>Add a new dataset</h1>
                </v-card-title>

                <v-divider></v-divider>

                <v-card-text>
                    <!-- Form -->
                    <v-form ref="createDataProfileForm">
                        <v-text-field   v-model="dataProfileName" 
                                        label="Name" 
                                        counter="30" 
                                        clearable
                                        v-validate="'required|min:8|max:30|alpha_num'"
                                        :error-messages="errors.first('name')"
                                        name="name"/>

                        <v-textarea v-model="dataProfileDescription" 
                                    label="Description" 
                                    counter="200" 
                                    clearable
                                    v-validate="'max:200'"
                                    :error-messages="errors.first('description')"
                                    name="description"/>
                    </v-form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <!-- Save -->
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn fab flat :loading="loading" @click="submitCreateDataProfileForm" v-on="on">
                                <v-icon>done</v-icon>
                            </v-btn>
                        </template>
                        <span>Save</span>
                    </v-tooltip>

                    <!-- Cancel Button -->
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn fab flat @click="closeDialog" v-on="on">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </template>
                        <span>Cancel</span>
                    </v-tooltip>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import apiMixin from '@/mixins/apiMixin'
import { bus } from '@/main'

export default {
    mixins: [apiMixin],
    data() {
        return {
            dialogCreateDataProfile: false,
            dataProfileName: '',
            dataProfileDescription: '',
            isLoading: false
        }
    },
    methods: {
        submitCreateDataProfileForm: async function() {
            this.isLoading = true

            var dataIsValid = false

            await this.$validator.validate()
            .then(valid => {
                if(valid) {
                    dataIsValid = true
                }
            })

            if(dataIsValid == true) {
                if(await this.createDataProfile(this.dataProfileName, this.dataProfileDescription)) {
                    this.closeDialog()
                    bus.$emit('refreshDataProfilesEvent')
                }
            }
            
            this.isLoading = false
        },
        closeDialog: function() {
            this.dialogCreateDataProfile = false
            this.dataProfileName = ''
            this.dataProfileDescription = ''
        }
    },
    computed: {
    loading: function() {
        return this.isLoading
    }
}
}
</script>