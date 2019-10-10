<template>
    <v-dialog v-model="$store.state.loading" persistent width="300px">
        <v-card dark>
            <v-card-text>
                Loading
                <v-progress-linear indeterminate></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {

}
</script>
