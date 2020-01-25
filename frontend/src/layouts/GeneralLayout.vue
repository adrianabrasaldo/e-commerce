<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          class="q-toolbar row no-wrap items-center q-pa-none mobile-only desktop-hide"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          E-com
        </q-toolbar-title>

        <q-space />
        <q-input dark dense standout v-model="search" input-class="text-right" class="q-ml-md">
          <template v-slot:append>
            <q-icon v-if="search === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
          </template>
        </q-input>
        
        <q-btn 
          dense 
          round 
          flat 
          icon="shopping_cart" 
          to="/my_cart"
          v-if="getUserCookies.role != 'admin'">
          <q-badge v-if="getCartCookies != 0 && getUserCookies.role == 'user'" color="red" floating>
            {{ getCartCookies }}
          </q-badge>
        </q-btn>       
        <q-btn v-if="getUserCookies == 0" flat stretch color="white" label="Login" to="/login"/>
        <q-btn v-if="getUserCookies == 0" flat stretch color="white" label="Register" to="/register"/>
        <q-btn-dropdown 
          v-if="getUserCookies != 0"
          stretch 
          flat 
          :label="getUserCookies.firstname + ' ' + getUserCookies.lastname ">
          <q-list>
            <q-item 
              clickable 
              v-for="dropdown in dropdown" :key="dropdown.id"
              @click="onSettingClick(dropdown.label)">
              <q-item-section >
                <q-item-label>{{ dropdown.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
      
    </q-page-container>
    
    <FooterComponent/>

  </q-layout>
</template>

<script>
import FooterComponent from 'components/general/FooterComponent.vue'

export default {
  components: {
    FooterComponent
  },
  data () {
    return {
      leftDrawerOpen: false,
      role: localStorage.getItem('userrole'),
      search: "",
      dropdown : [
        { label: "My Profile"},
        { label: "Logout"}
      ]
    }
  },
  computed: {
    getUserCookies() {
      return this.$store.getters['central/getUserCookies']
    },
    getCartCookies() {
      var cart =  this.$store.getters['central/getCartCookies']
      return cart.length
    }
  },
  methods: {
    onSettingClick(label) {      
      if (label == 'My Profile') {
        if (this.getUserCookies.role == "admin") {
          this.$router.push('/admin/dashboard')
        }
        else if (this.getUserCookies.role == "user") {
          this.$router.push('/user/manage_account')
        }
      }
      else if (label == 'Logout') {
          this.logout()
      }
    },
    logout() {
      this.$store.dispatch('central/unsetUserCookies')
    },
    
  }
}
</script>

<style>
</style>
