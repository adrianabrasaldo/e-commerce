<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal >
      <q-toolbar color="primary">
         <q-btn 
          flat
          dense 
          round 
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          {{ getUserCookies.firstname }}'s Account
        </q-toolbar-title>
        <q-space/>
        <q-btn-dropdown 
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
      side="left"
      v-model="leftDrawerOpen"
      content-class="bg-grey-2"
    >    
      <q-scroll-area style="height: calc(100% - 150px); border-right: 1px solid #ddd">
        <div class="bg-grey-5 text-center q-pa-md">
          <q-avatar size="56px" class="q-mb-sm">
            <img :src="'http://localhost:5000/' + getUserCookies.photo">
          </q-avatar>
          <div class="text-weight-bold">{{ getUserCookies.firstname + ' ' + getUserCookies.lastname }}</div>
          <div>{{ getUserCookies.email }}</div>
        </div>
        <q-list>
          <q-item 
            clickable
            v-for="drawer in user_list" :key="drawer.id"
            :to="drawer.to">
            <q-item-section avatar>
              <q-icon :name="drawer.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ drawer.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>

export default {
  name: "UserLayout",
  data() {
    return {
      leftDrawerOpen: true,
      user_list : [
        { icon: "list", to: "/user/manage_account", name: "Manage Account"},
        { icon: "list", to: "/user/my_order", name: "My Order"}
      ],
      dropdown : [
        { label: "My Profile"},
        { label: "Logout"}
      ]
    }
  },
  computed: {
    getUserCookies() {
      return this.$store.getters['central/getUserCookies']
    }
  },
  methods: {
    onSettingClick(label) {
      if (label == 'Logout') {
        this.$store.dispatch('central/unsetUserCookies')
      }
    }
  },
}
</script>
