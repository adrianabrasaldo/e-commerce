<template>
  <div 
    class="container" 
    style="width: 450px">
    <q-card-section class="bg-green-10 text-white">
      <div class="text-h6">Create your account</div>
    </q-card-section>
    <form @submit.prevent.stop="onRegister">      
      <q-stepper    
        v-model="step"
        ref="stepper"
        alternative-labels
        color="primary"
        animated
      >
        <q-step
          :name="1"
          icon="settings"
          title="Personal"
          :done="step > 1">    
          <q-input
            dense 
            v-model="user_lastname" 
            type="text" 
            label="Last Name" 
            hint="Enter your last name"
            :rules="lastnameErrors" />
          <q-input 
            dense 
            v-model="user_firstname" 
            type="text" 
            label="First Name"
            hint="Enter your first name"
            :rules="firstnameErrors" />    
          <q-input 
            dense 
            v-model="user_address" 
            type="text" 
            label="Address" 
            hint="Enter your adress"
            :rules="addressErrors" />
          <q-input 
            dense 
            v-model="user_birthdate" 
            mask="date" 
            :rules="['date']" 
            label="Enter your birthdate" 
            hint="Enter your birthdate">
            <template v-slot:append>
              <q-icon 
                name="event" 
                class="cursor-pointer">
                <q-popup-proxy 
                  ref="qDateProxy" 
                  transition-show="scale" 
                  transition-hide="scale">
                  <q-date v-model="user_birthdate" @input="() => $refs.qDateProxy.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select 
            dense 
            v-model="user_gender" 
            :options="gender" 
            label="Gender" 
            hint="Select your gender"
            :rules="genderErrors" />
        </q-step>
        <q-step
          :name="2"
          icon="vpn_key"
          title="Credentials"
          :done="step > 2"
        >
          <q-input 
            dense 
            v-model="user_email" 
            type="text" 
            label="Email Address" 
            hint="Enter your email"
            :rules="emailErrors"
             />
          <q-input 
            dense 
            v-model="user_password" 
            type="password" 
            label="Password" 
            hint="Enter your password"
            :rules="passwordErrors"  /> 
          <q-input 
            dense 
            v-model="user_confirmpassword" 
            type="password" 
            label="Confirm your password" 
            hint="Confirm  your password"
            :rules="confirmPasswordErrors"  />     
        </q-step>
        <template v-slot:message>
          <q-banner class="bg-yellow-10 text-white q-px-lg">           
            Already have an account?
            <span class="text-weight-medium" style="text-decoration: none"> 
              <router-link to="/Login">
                Sign in 
              </router-link>
            </span> here
          </q-banner>
          <BannerMessageComponent :banner_color="banner_color" 
                                  :banner_icon="banner_icon" 
                                  :banner_message="banner_message" 
                                  :banner_state="banner_state"/>
        </template>
        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn @click="resume" color="primary" :label="label"/>            
            <q-btn v-if="step > 1" flat color="primary" @click="back" label="Back" class="q-ml-sm" />
          </q-stepper-navigation>
        </template>      
      </q-stepper>
    </form>
  </div>
</template>

<script>
import BannerMessageComponent from 'components/general/BannerMessageComponent.vue';
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  components: {
    BannerMessageComponent
  },
  data() {
    return {
      step: 1,
        
      banner_color:   '',
      banner_icon:    '',
      banner_message: '',
      banner_state:   false,

      user_lastname:  "",
      user_firstname: "",
      user_address:   "",
      user_birthdate: "",
      user_gender:    null,
      user_email:     "",
      user_password:  "",
      user_confirmpassword: "",

      gender: ['Male', 'Female'],   
      label: 'Continue' 

    }
  },
  validations: {
    user_lastname:  { required },
    user_firstname: { required },
    user_address:   { required },
    user_gender:    { required },
    user_email:     { required, email },
    user_password:  { required, minLength: minLength(6) },
    user_confirmpassword:  { required, minLength: minLength(6), sameAsPassword: sameAs('user_password') }
  },
  computed: {
    lastnameErrors() {
      const errors = [ v => this.$v.user_lastname.required || 'Last name is required' ]
      return errors
    },
    firstnameErrors() {
      const errors = [ v => this.$v.user_firstname.required || 'First name is required', ]
      return errors
    },
    addressErrors() {
      const errors = [ v => this.$v.user_address.required || 'Address is required', ]
      return errors
    },
    genderErrors() {      
      const errors = [ v => this.$v.user_gender.required || 'Gender is required', ]
      return errors
    },
    emailErrors() {
      const errors = [
        v => this.$v.user_email.required || 'E-mail is required',
        v => this.$v.user_email.email || 'E-mail must be valid',
      ]
      return errors
    },
    passwordErrors() {
      const errors = [
        v => this.$v.user_password.required || 'Password is required',
        v => this.$v.user_password.minLength || 'Password must have at least ' + this.$v.user_password.$params.minLength.min  + ' letters.',
      ]
      return errors
    },
    confirmPasswordErrors() {
      const errors = [
        v => this.$v.user_confirmpassword.required || 'Confirm password is required',
        v => this.$v.user_confirmpassword.sameAsPassword || 'Password does not match',
        v => this.$v.user_confirmpassword.minLength || 'Password must have at least ' + this.$v.user_confirmpassword.$params.minLength.min  + ' letters.',
      ]
      return errors
    }
  },
  methods: {
    resume() {      
      this.$refs.stepper.next()
      // if (!this.$v.$invalid) {   
      if (this.label == 'Register') {
        this.onRegister()
      } 
        this.label = this.step === 2 ? 'Register' : 'Continue' 
    },
    back() {
      this.$refs.stepper.previous()
      this.label = this.step === 2 ? 'Register' : 'Continue' 
    },
    onRegister() {
      
      this.axios.post('http://localhost:5000/users/register', 
      {
        user_lastname:  this.user_lastname,
        user_firstname: this.user_firstname,
        user_role:      'user',
        user_address:   this.user_address,
        user_birthdate: this.user_birthdate,
        user_gender:    this.user_gender,
        user_email:     this.user_email,
        user_password:  this.user_password
      })
      .then(res => {
        if (res.data.error == 'Register error') {
          
        }
        else if (res.data.error == 'User already exist') {
                        
        }
        else {
          this.user_lastname =  '',
          this.user_firstname = '',
          this.user_address =   '',
          this.user_birthdate = '',
          this.user_gender =    '',
          this.user_email =     '',
          this.user_password =  ''

          this.$q.notify({
            message: res.data.status,
            icon: 'check_circle',
            color: 'primary',
            position: 'bottom',
          })
          this.$router.push('/login')
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  },

  beforeRouteEnter(to, from, next) {
    
    var userCookies = JSON.parse(localStorage.getItem('vuex'));
    
    if (userCookies == null) { next() }
    else {
      if (userCookies.central.user_cookies != 0) { next('/home') }
      else { next() }
    }
  }
}
</script>

<style>

</style>

