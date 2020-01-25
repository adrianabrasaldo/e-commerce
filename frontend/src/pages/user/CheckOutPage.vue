<template>
  <div class="container">
    <div v-if="cart_list.length != 0" class="row wrap q-gutter-x-sm justify-center">
      <div class="col-xs-12 col-lg-6">
        <div class="text-h5 text-weight-bold  q-pa-sm q-mb-sm ">
          CHECKOUT
        </div>
        <div class="row shadow-1 q-pa-sm q-mb-sm desktop-only">
          <div class="col-xs-12 col-lg-3 text-weight-bold">
            {{ total_quantity }} ITEMS
          </div>
          <div class="col-xs-12 col-lg-4">
            <span class="text-subtitle2 text-weight-bold">NAME</span>
          </div>
          <div class="col-xs-12 col-lg-2">
            <span class="text-subtitle2 text-weight-bold">PRICE</span>
          </div>
          <div class="col-xs-12 col-lg-2">
            <span class="text-subtitle2 text-weight-bold">QUANTITY</span>
          </div>
        </div>
        <div class="shadow-1 q-pa-sm q-mb-sm">
          <div class="text-h6 text-weight-regular q-mb-sm">
            Cart Summary
          </div>
          <div class="row wrap" v-for="cart in cart_list" :key="cart.id">
            <div class="col-xs-12 col-lg-3">
              <img :src="'http://localhost:5000/'+ cart.product_images[0]" style="width:80px;" >
            </div>
            <div class="col-xs-12 col-lg-4">
              <router-link  :to="'/view_product/'+  cart.product_name" tag="div" style="cursor:pointer">
              <span class="text-subtitle2 text-weight-bold text-primary">{{ cart.product_name }} </span>
              </router-link>
            </div>
            <div class="col-xs-12 col-lg-2">
              <span class="text-subtitle2 text-weight-bold text-primary"> ₱{{ cart.product_price }} </span>
            </div>
            <div class="col-xs-12 col-lg-2">
              <span class="text-subtitle2 text-weight-bold text-primary"> Qty: {{ cart.product_current_qty }} </span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-lg-4">
        <div class="column">
          <div class="col shadow-1 q-pa-md">
            <div class="text-subtitle1 text-weight-bold q-pb-md">Shipping & Billing address</div>
            <form @submit.prevent="updateAddress">                        
              <q-input 
                ref="email"
                dense 
                square 
                outlined 
                :readonly="address_state"
                v-model="address" 
                bottom-slots
                label="Address"
                :rules="addressErrors"
              >
                <template v-slot:append>
                  <q-icon v-if="address_state !== ''" name="close" @click="address_state = address_state" class="cursor-pointer" />
                </template>
                <template v-slot:after>
                  <q-btn 
                    dense
                    flat
                    round 
                    color="blue-10" 
                    icon="edit" @click="address_state = !address_state"/>
                </template>
              </q-input>              
            </form>
            <form @submit.prevent="updateAddress">
              <q-input 
                ref="email"
                dense 
                square 
                outlined 
                :readonly="email_state"
                v-model="email" 
                bottom-slots
                label="Email"
                :rules="addressErrors"
              >
                <template v-slot:append>
                  <q-icon v-if="email_state !== ''" name="close" @click="email_state = email_state" class="cursor-pointer" />
                </template>
                <template v-slot:after>
                  <q-btn 
                    dense
                    flat
                    round 
                    color="blue-10" 
                    icon="edit" @click="email_state = !email_state"/>
                </template>
              </q-input>          
            </form>
          </div>
          <div class="col shadow-1 q-pa-md">
            <div class="text-subtitle1 text-weight-bold q-pb-md">
              Payment Method
            </div>
            <div class="q-gutter-y-md" style="max-width: 350px">
              <q-tabs
                v-model="payment_method"
                align="justify"
                narrow-indicator
                inline-label
              >
                <!-- <q-tab class="bg-primary text-white" name="wallet" label="Wallet" /> -->
                <q-tab class="bg-primary text-white" name="cod" label="COD" />
              </q-tabs>
              <q-tab-panels
                v-model="payment_method"
                animated
              >
                <!-- <q-tab-panel name="wallet">
                  <div class="text-subtitle2">Your wallet balance</div>
                  <div class="">                    
                    <span class="text-subtitle1 text-weight-bolder"
                    v-bind:class="[total_amount >= wallet_balance ? 'text-negative' : '', 'text-primary']">
                      Php {{ wallet_balance }}
                    </span>
                    <div v-if="total_amount >= wallet_balance" class="text-negative">
                      *Your ballance wallet is not enough*
                    </div>
                  </div>
                </q-tab-panel> -->
                <q-tab-panel name="cod">
                  <div class="text-subtitle1">Cash On Delivery</div>
                  <div class="text-subtitle2">Please prepare cash</div>
                </q-tab-panel>
              </q-tab-panels>
            </div>
          </div>
        </div>
        <div class="shadow-1 q-pa-md">
          <div class="text-h6 text-weight-regular q-mb-sm">
            Order Summary
          </div>
          <div class="q-mt-sm q-mb-sm">
            <div class="row">
              <div class="col-xs-6 col-lg-6">
                Subtotal ({{ total_quantity }} items)
              </div>
              <div class="col-xs-6 col-lg-6 text-right">
                ₱{{ sub_total_amount }}
              </div>
            </div>
            <div class="row">
              <div class="col-xs-6 col-lg-6">
                Shipping Fee
              </div>
              <div class="col-xs-6 col-lg-6 text-right">
                ₱{{ shipping_fee }}
              </div>
            </div>
            <div class="row">
              <div class="col-xs-6 col-lg-6">
                Total
              </div>
              <div class="col-xs-6 col-lg-6 text-right">
                ₱ {{ total_amount }}
              </div>
            </div>
          </div> 
          <q-btn 
          :disabled=" total_amount >= wallet_balance && payment_method == 'wallet' ? true: 
                      total_amount >= wallet_balance && payment_method == 'cod' ? true : false"
            class="full-width"
            color="blue-10" 
            label="Confirm Order" 
            @click="confirmOrder"/>
        </div>
      </div>
    </div>    
    <div v-else class="text-subtitle2 text-weight-bold text-center">
      <div class="q-pa-md">
        There are no items to checkout
      </div>
      <q-btn 
        color="white" 
        text-color="black" 
        label="Continue Shopping"
        @click="$router.push('/home')" />
    </div>

    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>

  </div>
</template>

<script>
import BannerMessageComponent from 'components/general/BannerMessageComponent.vue';

import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      user_id: 0,

      address:          "",
      address_state:    true,
      email:          "",
      email_state:    true,

      cart_list:        [],
      payment_method:   'COD', 
      wallet_balance:   10000,
      payment:          0.0,
      change:           0.0,

      sub_total_amount: 0.0,
      total_quantity:   0,
      total_amount:     0.0,
      shipping_fee:     200
    }
  },
  validations: {
    
    address:  { required },
    
    user_currentPassword: { required, minLength: minLength(6) },
    user_newPassword:     { required, minLength: minLength(6) },
    user_confirmPassword: { required, minLength: minLength(6), sameAsPassword: sameAs('user_newPassword') }
  },
  computed: {
    getUserCookies() {
      return this.$store.getters['central/getUserCookies']
    },
    addressErrors() {
      const errors = [
        v => this.$v.address.required || 'Address is required'
      ]
      return errors
    },
  },
  methods: {
    getCartList() {
      var cart = this.$store.getters['central/getCartCookies']
      this.cart_list = cart
    },

    confirmOrder() {
            
      this.payment = 0.0
      this.change = 0.0

      var transaction_data = { 
        transaction_total:    this.total_amount, 
        transaction_tendered: this.payment, 
        transaction_change:   this.change, 
        transaction_method:   'COD', 
        transaction_status:   "Processing",
        user_id:              this.user_id
      }

      this.axios.post('http://localhost:5000/transactions/confirm_order', {
        cart_list: this.cart_list,
        transaction_data: transaction_data
      })
      .then(res => {
        console.log(res.data)
      })
      
      this.$store.dispatch('central/unsetCartList')
      this.$q.notify({
        message: "Checkout is successfully thank you for shopping",
        icon: 'check_circle',
        color: 'primary',
        position: 'bottom',
      })
      this.$router.push('/home')
    },

    subTotalAmount () {
        let total = [];
        Object.entries(this.cart_list).forEach(([key, val]) => { 
            total.push(val.product_price * val.product_current_qty) 
        });                
        this.sub_total_amount =  total.length != 0 ? Math.round(total.reduce(function(total, num){ return total + num }, 0) * 100) / 100: 0 
    },
    totalQuantity() {      
        let quantity = [];
        Object.entries(this.cart_list).forEach(([key, val]) => { 
            quantity.push(val.product_current_qty) 
        });                
        this.total_quantity =  quantity.length != 0 ? quantity.reduce(function(quantity, num){ return quantity + num }) : 0 
    },
    totalAmount() {
      this.total_amount = parseInt(this.sub_total_amount) + parseInt(this.shipping_fee)
    },
    profile() {
      this.axios.post('http://localhost:5000/users/profile', {
        user_email: this.getUserCookies.email
      })
      .then(res => {
        this.user_id = res.data.profile.user_id
        this.address = res.data.profile.user_address
        this.email = res.data.credentials.user_email
      })
    }
  },
  mounted() {
    this.getCartList()
    this.subTotalAmount()
    this.totalQuantity()
    this.totalAmount()
    this.profile()
  },
}
</script>