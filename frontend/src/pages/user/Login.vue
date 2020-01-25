<template>
  <div class="container" style="width: 350px">
    <div class="q-pa-lg shadow-2 ">              
      <q-toolbar class="primary">
        <q-toolbar-title>
          Login
        </q-toolbar-title>
      </q-toolbar>
      
      <BannerMessageComponent :banner_color="banner_color" 
                              :banner_icon="banner_icon" 
                              :banner_message="banner_message" 
                              :banner_state="banner_state"/>
                              
      <form @submit.prevent.stop="onSubmit">
        <q-input 
            v-model="user_email"
            label="Email"
            hint="Enter your email"
            :rules="emailErrors"
            autofocus 
          >
          <template v-slot:prepend>
            <q-icon name="account_circle" />
          </template>
        </q-input>
        <q-input 
          v-model="user_password" 
          type="password" 
          label="Password"
          hint="Enter your password"
          :rules="passwordErrors"
        >
          <template v-slot:prepend>
            <q-icon name="vpn_key" />
          </template>
        </q-input>`
        <q-checkbox 
          v-model="rememberMe" 
          label="Remember me" 
          color="primary"
        />      
        <q-btn 
          @click="onSubmit" 
          color="primary" 
          class="full-width" 
          type="submit" 
          label="Login" 
        />   
        <div class="q-pa-sm">
          No account yet?
          <span
            class="text-weight-medium" 
            to="/Register"
          > 
            <router-link 
              to="/register"
            >
              Sign up 
            </router-link>
          </span> here
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BannerMessageComponent from 'components/general/BannerMessageComponent.vue';
import { required, email } from 'vuelidate/lib/validators'

export default {
  components: {
    BannerMessageComponent
  },
  data() {
    return {
      user_email:     "",
      user_password:  "",
      rememberMe:     false,

      banner_color:   '',
      banner_icon:    '',
      banner_message: '',
      banner_state:   false
    }
  },
  validations: {
    user_email:     { required, email },
    user_password:  { required }
  },
 computed: {
    getUserCookies() { return this.$store.getters['central/getProductList'] },
    emailErrors() {
      const errors = [
        v => this.$v.user_email.required || 'E-mail is required',
        v => this.$v.user_email.email || 'E-mail must be valid',
      ]
      return errors
    },
    passwordErrors() {
      const errors = [ v => this.$v.user_password.required || 'Password is required' ]
      return errors
    }
  },
  methods: {
    onSubmit() {     
      if (this.$v.$invalid == false) {          
        this.axios.post('http://localhost:5000/users/login', {
          user_email:     this.user_email,
          user_password:  this.user_password
        })
        .then(res => {
          var status = res.data.status;
          if (status == "Invalid email and password") {
            this.banner_color   = 'bg-negative'
            this.banner_icon    = 'error'
            this.banner_message = status
            this.banner_state   = true

            setTimeout(() => { this.banner_state = false }, 4000)
          }
          else {
            this.$store.dispatch('central/setUserCookies', {
              token:      res.data.token, 
              role:       res.data.role,  
              lastname:   res.data.lastname, 
              firstname:  res.data.firstname,
              email:      res.data.email,
              photo:      res.data.photo 
            })
            if (res.data.role == 'admin') {
              this.$router.push('/admin/dashboard')
            }
            else {
              this.$router.push('/home')
            }
          }        
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  },

  beforeRouteEnter(to, from, next) {    
    var cookies = JSON.parse(localStorage.getItem('vuex'))
    if (cookies == null) {
      next()
    }
    else {
      if (cookies.central.user_cookies != 0) {
        next('/home')
      }
      else {
        next()
      }
    }
  }   
}
</script>
