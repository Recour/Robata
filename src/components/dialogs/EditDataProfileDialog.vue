<template>
    <div>
        <v-dialog v-model="dialogEditDataProfile" persistent max-width="600px">            
            <v-card>
                <v-card-title>
                    <h1>Dataset settings</h1>
                </v-card-title>

                <v-card-text>
                    <v-form ref="editDataProfileForm">
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

                <v-card-actions>
                    <!-- Save -->
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn fab flat :loading="loadingEdit" :disabled="loadingDelete" @click="submitEditDataProfileForm" v-on="on">
                                <v-icon>done</v-icon>
                            </v-btn>
                        </template>
                        <span>Save</span>
                    </v-tooltip>

                    <!-- Cancel Button -->
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn fab flat :disabled="loadingEdit||loadingDelete" @click="closeDialog" v-on="on">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </template>
                        <span>Cancel</span>
                    </v-tooltip>

                    <v-spacer></v-spacer>

                    <v-btn :disabled="loadingEdit" :loading="loadingDelete" @click="deleteClicked" flat color="error">Delete</v-btn>
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
            dataProfile: null,
            dialogEditDataProfile: false,
            dataProfileName: '',
            dataProfileDescription: '',
            loadingEdit: false,
            loadingDelete: false
        }
    },
    methods: {
        submitEditDataProfileForm: async function() {
            this.loadingEdit = true

            var dataIsValid = false

            await this.$validator.validate()
            .then((valid) => {
                if(valid) {
                    dataIsValid = true
                }
            })

            if(dataIsValid == true) {
                if(await this.updateDataProfile(this.dataProfile.id, this.dataProfileName, this.dataProfileDescription)) {
                    this.closeDialog()
                    bus.$emit('refreshDataProfilesEvent')
                }
            }

            this.loadingEdit = false
        },
        closeDialog: function() {
            this.dialogEditDataProfile = false
        },
        openDialog: function(dataProfile) {
            this.dialogEditDataProfile = true
            this.dataProfileName = dataProfile.name
            this.dataProfileDescription = dataProfile.description
            this.dataProfile = dataProfile
        },
        deleteClicked: async function() {
            this.loadingDelete = true
            
            if(await this.deleteDataProfile(this.dataProfile.id, this.dataProfile.name)) {
                this.closeDialog()
                bus.$emit('refreshDataProfilesEvent')
            }

            this.loadingDelete = false
        }
    }
}
</script>
