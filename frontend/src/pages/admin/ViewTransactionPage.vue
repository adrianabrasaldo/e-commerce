<template>
  <div class="container">
    <div class="q-pb-md">
      <q-toolbar class="col-sm-12 col-lg-11">
        <q-btn 
          dense 
          round 
          color="primary" 
          text-color="white" 
          icon="keyboard_arrow_left" 
          to="/admin/delivery"/>
        <q-toolbar-title class="text-h5 text-weight-bold">Transaction Information</q-toolbar-title>
      </q-toolbar>
    </div>
    
    <div class="row q-gutter-sm justify-center">
      <div class="col-xs-12 col-md-4 col-lg-3">
        <div class="shadow-1 q-pa-md">
          <div class="text-subtitle1 text-weight-bold q-mb-md">
            Transaction Information
          </div>
          <div class="row q-gutter-sm">
            <div class="col-xs-5 col-lg-5">
              #: 
            </div>
            <div class="col-xs-5 col-lg-5">
              {{ transaction.transaction_id }}
            </div>
            <div class="col-xs-5 col-lg-5">
              Date: 
            </div>
            <div class="col-xs-5 col-lg-5">
              {{ transaction.transaction_timestamp }}
            </div>
            <div class="col-xs-5 col-lg-5">
               Total:
            </div>
            <div class="col-xs-5 col-lg-5">
              ₱{{ transaction.transaction_total }}
            </div>
            <div class="col-xs-5 col-lg-5">
              Tendered:
            </div>
            <div class="col-xs-5 col-lg-5">
              ₱{{ transaction.transaction_tendered }}
            </div>
            <div class="col-xs-5 col-lg-5">
              Change:
            </div>
            <div class="col-xs-5 col-lg-5">
              ₱{{ transaction.transaction_change }}
            </div>
            <div class="col-xs-5 col-lg-5">
              Method:
            </div>
            <div class="col-xs-5 col-lg-5">
              {{ transaction.transaction_method }}
            </div>
            <div class="col-xs-5 col-lg-5">
              Status: 
            </div>
            <div class="col-xs-5 col-lg-5">
              <q-badge :color="transaction.transaction_status == 'Delivered'? 'primary' : 
                               transaction.transaction_status == 'Shipped' ? 'blue-9' : 
                               transaction.transaction_status == 'Processing' ? 'grey-5' : ''">
                {{ transaction.transaction_status }}
              </q-badge>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-md-4 col-lg-4">
        <div class="shadow-1 q-pa-md">
          <div class="text-subtitle1 text-weight-bold q-mb-md">
            Customer Information
          </div>
          <div class="row q-gutter-sm">
            <div class="col-xs-12 col-lg-12">
              <div class="text-center">
                <q-avatar size="100px">
                  <img :src="'http://localhost:5000/' + user.user_photo">
                </q-avatar>
              </div>
            </div>
            <div class="col-xs-5 col-lg-4">
              <span class="text-weight-bold">ID</span>:
            </div>
            <div class="col-xs-5 col-lg-5">
               {{ user.user_id }}
            </div>
            <div class="col-xs-5 col-lg-4">
              Last Name:
            </div>
            <div class="col-xs-5 col-lg-5">
              {{ user.user_lastname }}
            </div>
            <div class="col-xs-5 col-lg-4">
              First Name:
            </div>
            <div class="col-xs-5 col-lg-4">
              {{ user.user_firstname }}
            </div>
            <div class="col-xs-5 col-lg-4">
              Email:
            </div>
            <div class="col-xs-5 col-lg-5">
              <div class="ellipsis">{{ user.user_email }}
                <q-tooltip>
                  {{ user.user_email }}
                </q-tooltip>
              </div>
            </div>
            <div class="col-xs-5 col-lg-4">
              Address:
            </div>
            <div class="col-xs-5 col-lg-5">
              {{ user.user_address }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-lg-7">
        <div class="shadow-1 q-pa-md">
          <div class="text-subtitle1 text-weight-bold q-mb-md">Product </div>     
            <div class="row" v-for="cart in carts" :key="cart.id">
              <div class="col-lg-2">
                <img style="width:100px" :src="'http://localhost:5000/' + cart.product_images[0].product_img_path">
              </div>
              <div class="col-8">
                  <div class="row q-pt-sm">
                    <div class="col-10">
                      <div class="col-lg-12 ">
                        <span class="text-primary text-weight-bolder">
                          {{ cart.product_name }}
                        </span>
                      </div>
                      <div class="col-12">
                        Brand: {{ cart.product_brand }}
                      </div>
                      <div class="col-12">
                        Price: {{ cart.cart_price }}
                      </div>
                      <div class="col-12">
                        Quantity: {{ cart.cart_quantity }}
                      </div>
                    </div>
                    <div class="col-2">
                       <q-btn round dense color="primary" icon="visibility" :to="'/view_product/' + cart.product_name" target="_blank"/>                      
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: [],
      transaction:{},
      carts: [],
      
      status_color: 'primary',
    }
  },
  methods: {
    viewTransaction(id) {
      this.axios.post('http://localhost:5000/transactions/view_transaction', {
        transaction_id: id
      })
      .then(res => {
        this.user =         res.data[0].user
        this.transaction =  res.data[0].transaction
        this.carts =        res.data[0].cart
      })
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.viewTransaction(to.params.transaction_id)
    next()
  },
  mounted() {
    this.viewTransaction(this.$route.params.transaction_id)
  }
}
</script>