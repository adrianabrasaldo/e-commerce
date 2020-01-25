<template>
  <div>
    <div class="container">      
      <div class="text-h5 text-weight-bold q-pb-lg">My Profile</div>
 
      <BannerMessageComponent :banner_color="banner_color" 
                              :banner_icon="banner_icon" 
                              :banner_message="banner_message" 
                              :banner_state="banner_state"/>
                              
      <q-splitter
        v-model="splitterModel"
        style="height: 600px"
      >
        <template v-slot:before>
          <q-tabs
            v-model="tab"
            vertical>
            <q-tab name="personal"  label="Personal" />
            <q-tab name="credentials" label="Credentials" />
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels
            v-model="tab"
            animated
            transition-prev="jump-up"
            transition-next="jump-up">
            <q-tab-panel name="personal">
              <div class="text-h6 q-mb-md">Personal Information</div>

                <div class="q-pa-md">
                  <div class="row items-center">
                    <div class="col-xs-12 col-lg-3">
                      <div class="text-center">
                        <q-avatar size="100px" class="">
                          <img :src="'http://localhost:5000/' + user_photo">
                        </q-avatar>
                        <div v-if="!profile_state">
                          <label  for="file-upload" class="custom-file-upload q-mt-md">
                            Upload Profile
                          </label>
                          <input id="file-upload" multiple type="file" size="60" ref="files">
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-12 col-lg-9">
                      <div class="row q-gutter-y-sm">
                        <div class="col-xs-12 col-lg-5">
                          <q-input 
                            dense 
                            square 
                            outlined 
                            :readonly="profile_state" 
                            v-model="user_lastname" 
                            label="Last Name"/>
                        </div>
                        <div class="col-xs-12 col-lg-5">
                          <q-input 
                            dense 
                            square 
                            outlined 
                            :readonly="profile_state" 
                            v-model="user_firstname" 
                            label="First Name" />
                        </div>
                        <div class="col-xs-12 col-lg-10">
                          <q-input 
                            dense 
                            square 
                            outlined 
                            :readonly="profile_state" 
                            v-model="user_address" 
                            label="Address" />
                        </div>
                        <div class="col-xs-12 col-lg-5">
                          <q-select 
                            dense 
                            square 
                            outlined 
                            :readonly="profile_state" 
                            v-model="user_gender" 
                            label="Gender" 
                            :options="gender_options" />
                        </div>
                        <div class="col-xs-12 col-lg-5">
                          <q-input 
                            dense 
                            square 
                            outlined 
                            :readonly="profile_state" 
                            v-model="user_birthdate" 
                            label="Birthdate" 
                            mask="date" 
                            :rules="['date']">
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
                    <q-btn color="blue-10" icon="edit" label="Edit" @click="profile_state = !profile_state"/>
                    <q-btn color="primary" icon="save" label="Save changes" v-if="!profile_state" @click="updateProfile" />
                  </div>
                </div>

            </q-tab-panel>
            <q-tab-panel name="credentials">
              <div class="text-h6 q-mb-md">
                Credentials
              </div>
              <div class="row x-gutter-y-lg">   
                  <div class="text-subtitle1 text-weight-bold">Email</div>
                    <div class="col-12 ">
                      <form @submit.prevent="updateEmail">                        
                      <q-input 
                        ref="email"
                        dense 
                        square 
                        outlined 
                        :readonly="email_state"
                        v-model="new_email" 
                        bottom-slots
                        label="Email"
                        :rules="emailErrors"
                      >
                        <template v-slot:append>
                          <q-icon v-if="new_email !== ''" name="close" @click="new_email = old_email" class="cursor-pointer" />
                        </template>
                        <template v-slot:after>
                          <q-btn 
                            round 
                            color="blue-10" 
                            icon="edit" @click="email_state = !email_state"/>
                        </template>
                      </q-input>
                      <q-btn 
                        color="primary" 
                        icon="save" 
                        label="Save Changes" 
                        style="width: 210px" 
                        v-if="!email_state" 
                        type="submit"
                      />
                      </form>
                    </div>
                </div>
                
                <div class="row q-pt-md q-pb-md">
                  <q-btn 
                    color="negative" 
                    icon="lock" 
                    label="Change Password" 
                    style="width: 210px" 
                    @click="password_state = !password_state"
                  />
                </div>    
                        
                <div v-if="password_state" class="row q-gutter-y-lg"> 
                  <div class="text-subtitle1 text-weight-bold">Password</div>
                  <div class="col-12">
                    <form @submit.prevent="updatePassword">                       
                      <q-input 
                        dense 
                        square 
                        outlined 
                        v-model="user_currentPassword" 
                        type="password" 
                        label="Current Password"
                        :rules="currentPasswordErrors" 
                      />   
                      <q-input 
                        dense 
                        square 
                        outlined 
                        v-model="user_newPassword" 
                        type="password" 
                        label="New Password"
                        :rules="newPasswordErrors"
                      />
                    <q-input 
                      dense 
                      square 
                      outlined 
                      v-model="user_confirmPassword"
                      type="password" 
                      label="Confirm Password" 
                      :rules="confirmPasswordErrors"/>
                      <q-btn 
                        color="primary" 
                        icon="save" 
                        label="Save Changes" 
                        type="submit"
                        @click="updatePassword"/>
                    </form>     
                  </div>     
                </div>
            </q-tab-panel>
          </q-tab-panels>
        </template>

      </q-splitter>
    </div>
  </div>
</template>

<script>
// import MyProfileComponent from 'components/user/general/MyProfileComponent.vue'
// import MyCredentialsComponent from 'components/user/general/MyCredentialsComponent.vue'
import BannerMessageComponent from 'components/general/BannerMessageComponent.vue';

import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  components:{
    BannerMessageComponent,
    // MyProfileComponent,
    // MyCredentialsComponent
  },
  data() {
    return {
      tab: 'personal',
      splitterModel: 20,

      profile:      [],
      credentials:  [],

      // CREDENTIAL ==========
      email_state: true, 
      password_state: false,

      user_currentPassword: '',
      user_newPassword:     '',
      user_confirmPassword: '',

      old_email: '',
      new_email: '',

      user_password: '',
      // ==================

      // PROFILE ==========
      profile_state: true,

      user_lastname:  '',
      user_firstname: '',
      user_gender:    '',
      user_birthdate: '',
      user_address:   '',
      gender_options: ["Male", "Female"],
      user_photo:     '',
      // ==================

      banner_color:   '',
      banner_icon:    '',
      banner_message: '',
      banner_state:   false
    }
  },
  validations: {
    
    new_email:  { required, email },
    
    user_currentPassword: { required, minLength: minLength(6) },
    user_newPassword:     { required, minLength: minLength(6) },
    user_confirmPassword: { required, minLength: minLength(6), sameAsPassword: sameAs('user_newPassword') }
  },
  computed: {
    getUserCookies() {
      return this.$store.getters['central/getUserCookies']
    },
    emailErrors() {
      const errors = [
        v => this.$v.new_email.required || 'E-mail is required',
        v => this.$v.new_email.email || 'E-mail must be valid',
      ]
      return errors
    },
    currentPasswordErrors() {
      const errors = [
        v => this.$v.user_currentPassword.required || 'Current Password is required',
        v => this.$v.user_currentPassword.minLength || 'Current Password must have at least ' + this.$v.user_currentPassword.$params.minLength.min  + ' letters.',
      ]
      return errors
    },
    newPasswordErrors() {
      const errors = [
        v => this.$v.user_newPassword.required || 'Password is required',
        v => this.$v.user_newPassword.minLength || 'Password must have at least ' + this.$v.user_newPassword.$params.minLength.min  + ' letters.',
      ]
      return errors
    },
    confirmPasswordErrors() {
      const errors = [
        v => this.$v.user_confirmPassword.required || 'Confirm password is required',
        v => this.$v.user_confirmPassword.sameAsPassword || 'Confirm Password does not match',
        v => this.$v.user_confirmPassword.minLength || 'Confirm Password must have at least ' + this.$v.user_confirmPassword.$params.minLength.min  + ' letters.',
      ]
      return errors
    }
  },

  methods: {
    updateProfile() {
      this.axios.post('http://localhost:5000/users/update_profile', {
        user_email:     this.old_email,
        user_lastname:  this.user_lastname,
        user_firstname: this.user_firstname,
        user_address:   this.user_address,
        user_birthdate: this.user_birthdate,
        user_gender:    this.user_gender
      })
      .then(res => {
        if (res.data.status == "Profile succesfully updated!") {
          this.setBannerMessage('bg-primary', 'check_circle', res.data.status, true)            
          this.$store.dispatch('central/setUserCookies', 
          {
            token:      this.getUserCookies.token, 
            role:       this.getUserCookies.role,  
            lastname:   this.user_lastname, 
            firstname:  this.user_firstname,
            email:      this.new_email ,
            photo:      this.getUserCookies.photo
          })
        }
        else {
          this.setBannerMessage('bg-negative', 'error', res.data.error, true)  
        }
      })      
    },
    setUpProfile () {
      this.user_lastname  = this.profile.user_lastname
      this.user_firstname = this.profile.user_firstname
      this.user_gender    = this.profile.user_gender
      this.user_birthdate = this.profile.user_birthdate
      this.user_address   = this.profile.user_address
      this.user_photo     = this.profile.user_photo
    },

    updateEmail() {
      if (this.old_email == this.new_email) {        
        this.setBannerMessage('bg-orange-10', 'warning', 'No changes detected', true)        
        this.email_state = true
      }
      else {
        this.axios.post('http://localhost:5000/users/change_email', {
          old_email: this.old_email,
          new_email: this.new_email
        })
        .then(res => {
          this.setBannerMessage('bg-primary', 'check_circle', res.data.status, true)  
          this.$store.dispatch('central/setUserCookies', 
          {
            token:      this.getUserCookies.token, 
            role:       this.getUserCookies.role,  
            lastname:   this.getUserCookies.lastname, 
            firstname:  this.getUserCookies.firstname,
            email:      this.new_email ,
            photo:      this.getUserCookies.photo
          })          
          this.email_state = true
        })
      }      
    },
    updatePassword() {      
      this.axios.post('http://localhost:5000/users/change_password', {
        old_email:    this.old_email,
        old_password: this.user_currentPassword,
        new_password: this.user_newPassword
      })
      .then(res => {
        if (res.data.status == "Password successfully updated") {
          this.setBannerMessage('bg-primary', 'check_circle', res.data.status, true)
          this.password_state       = false
          this.user_currentPassword = '',
          this.user_newPassword     = '',
          this.user_confirmPassword = '',
          this.setProfileAndCredentials()
        }
        else {
          this.setBannerMessage('bg-negative', 'warning', res.data.status, true)  
        }
      })    
    },
    setUpCredentials() {
      this.old_email =      this.credentials.user_email
      this.new_email =      this.old_email
      this.user_password =  this.credentials.user_password
    },
    
    setBannerMessage(color, icon, message, state) {            
      this.banner_color = color
      this.banner_icon = icon
      this.banner_message = message
      this.banner_state = state      
      setTimeout(() => { this.banner_state = false }, 4000)
    },

    setProfileAndCredentials() {
      this.axios.post('http://localhost:5000/users/profile', {
        user_email: this.getUserCookies.email
      })
      .then(res => {
        this.profile = res.data.profile
        this.setUpProfile()

        this.credentials = res.data.credentials
        this.setUpCredentials()
      })
    }
  },
  mounted() {
    this.setProfileAndCredentials()
  },
}
</script>

<style>
input[type="file"] {
    display: none;
}
.custom-file-upload {
  font-weight: bold;
  border: 1px solid #ccc;
  display: inline-block;
  padding: 10px 12px;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
