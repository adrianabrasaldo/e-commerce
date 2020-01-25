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
          E-Com Admin Panel
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
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <div class="text-weight-bold">{{ getUserCookies.lastname + ' ' + getUserCookies.lastname }}</div>
          <div>{{ getUserCookies.email }}</div>
        </div>
        <q-list>
          <q-item 
            clickable
            v-for="drawer in admin_list" :key="drawer.id"
            :to="drawer.to">
            <q-item-section avatar>
              <q-icon :name="drawer.icon" :color="drawer.color"/>
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
  name: "AdminLayout",
  data() {
    return {
      leftDrawerOpen: true,
      admin_list : [
        { 
          icon: "dashboard",
          to: "/admin/dashboard", 
          name: "Dashboard", 
          color:"primary"
        },
        { 
          icon: "category", 
          to: "/admin/category", 
          name: "Category",  
          color:"green"},
        { 
          icon: "fa fa-list-alt",    
          to: "/admin/products", 
          name: "Products", 
          color:"grey"},
        { 
          icon: "fas fa-shipping-fast", 
          to: "/admin/delivery", 
          name: "Delivery", 
          color:"blue-9"
        },
        { 
          icon: "fas fa-dollar-sign", 
          to: "/admin/sales",
          name: "Sales",
          color:"primary"},
        { icon: "link", to: "/home", name: "Ecom.com"}
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
