<template>
    <div>
        <div class="q-pa-md">
            <div class="row items-center">
                <div class="col-3">
                    <div class="text-center">
                        <q-avatar size="100px">
                            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                        </q-avatar>
                    </div>
                </div>
                <div class="col-9">
                    <div class="row q-gutter-y-sm">
                        <div class="col-5">
                            <q-input 
                                dense 
                                square 
                                outlined 
                                :readonly="edit" 
                                v-model="user_lastname" 
                                label="Last Name"
                            />
                        </div>
                        <div class="col-5">
                            <q-input 
                                dense 
                                square 
                                outlined 
                                :readonly="edit" 
                                v-model="user_firstname" 
                                label="First Name" 
                            />
                        </div>
                        <div class="col-10">
                            <q-input 
                                dense 
                                square 
                                outlined 
                                :readonly="edit" 
                                v-model="user_address" 
                                label="Address"
                            />
                        </div>
                        <div class="col-5">
                            <q-select 
                                dense 
                                square 
                                outlined 
                                :readonly="edit" 
                                v-model="user_gender" 
                                label="Gender" 
                                :options="gender_options"
                            />
                        </div>
                        <div class="col-5">
                            <q-input 
                                dense 
                                square 
                                outlined 
                                :readonly="edit" 
                                v-model="user_birthdate" 
                                label="Birthdate" 
                                mask="date" 
                                :rules="['date']"
                            >
                                <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                        <q-date v-model="user_birthdate" @input="() => $refs.qDateProxy.hide()" />
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="q-gutter-xs" vertical align="left">
                <q-btn color="blue-10" icon="edit" label="Edit" @click="editProfile"/>
                <q-btn color="primary" icon="save" label="Save" v-if="update" @click="updateProfile" />
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        profile: {
            type: Object
        }
    },
    data() {
        return {
            edit: true,
            update: false, 

            user_lastname: '',
            user_firstname: '',
            user_gender: '',
            user_birthdate: '',
            user_address: '',

            gender_options: ["Male", "Female"]
        }
    },
    methods: {
        editProfile() {
            this.edit = false
            this.update = true
        },
        updateProfile () {
            // console.log(this.user_lastname)
        },
        setUpProfile () {
            this.user_lastname = this.profile.user_lastname
            this.user_firstname = this.profile.user_firstname
            this.user_gender = this.profile.user_gender
            this.user_birthdate = this.profile.user_birthdate
            this.user_address = this.profile.user_address
        }
    },
    mounted() {
        this.setUpProfile()
    },
}
</script>