<template>
  <div class="container q-pt-lg">
    <div v-if="cart_list.length != []" class="row wrap q-gutter-sm">
      <div class="q-gutter-y-md col-xs-12 col-sm-12 col-md-7 col-lg-8">
        <div class="row  wrap q-pa-sm shadow-1" v-for="cart in cart_list" :key="cart.product_id">
          <div class="col-xs-12 col-lg-2">
            <img :src="'http://localhost:5000/'+ cart.product_images[0]" style="width:120px;" >
          </div>
          <div class="col-xs-12 col-lg-5">
            <router-link  :to="'/view_product/'+  cart.product_name" tag="div" style="cursor:pointer">
            <span class="text-subtitle2 text-weight-bold text-green-10">{{ cart.product_name }} </span>
            </router-link>
          </div>
          <div class="col-xs-12 col-lg-2">
            <div class="column">
              <div class="col-xs-12 col-lg-2">
                <span class="text-subtitle1 text-weight-bold text-primary"> ₱{{ cart.product_price }} </span>
              </div>
              <div class="col-xs-12 col-lg-2">
                <div class="q-gutter-x-xs">                      
                  <q-btn size="xs" round color="primary" icon="favorite" >
                    <q-tooltip anchor="top middle" self="top middle">
                      Add to wish list
                    </q-tooltip>
                  </q-btn>
                  <q-btn size="xs" round color="negative" icon="delete" @click="removeFromCart(cart)" >
                    <q-tooltip anchor="top middle" self="top middle">
                      Delete from list 
                    </q-tooltip>
                  </q-btn>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-lg-3">
                <div class="row q-gutter-xs">
                  <q-btn 
                    dense 
                    round 
                    color="negative" 
                    icon="remove" 
                  />
                  <q-input 
                    dense          
                    readonly  
                    v-model="cart.product_current_qty"              
                    style="width: 20px;" 
                  />
                  <q-btn 
                    dense 
                    round 
                    color="primary" 
                    icon="add"/> 
                </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
        <div class="shadow-1 q-pa-md">
          <div class="text-h6 text-weight-regular">Order Summary</div>
          <q-separator />
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
            class="full-width" 
            color="accent" 
            label="Proceed to checkout" 
            @click="$router.push('/checkout')"/>
          </div>       
      </div>
    </div>
    <div v-else class="text-subtitle2 text-weight-bold text-center">
      <div class="q-pb-md">
        There are no items in this cart
      </div>
      <q-btn 
        color="white" 
        text-color="black" 
        label="Continue Shopping"
        @click="$router.push('/home')" />
    </div>
    <RecommendedProductComponent/>

  </div>
</template>

<script>
import RecommendedProductComponent from 'components/general/RecommendedProductComponent.vue'
import { parse } from 'path';

export default {
  components: {
    RecommendedProductComponent
  },
  data() {
    return {
      cart_list: [],
      shipping_fee: 200,
      sub_total_amount: 0.0,
      total_quantity: 0.0,
      total_amount: 0.0
    }
  },
  computed: {

    // retrieveWallet () {
    //   this.user_id = JSON.parse(localStorage.getItem('id'));

    //   this.axios.post('http://127.0.0.1:8000/api/retreiveWallet', {        
    //       user_id: this.user_id
    //   })
    //   .then(res => {
    //       this.wallet_balance =  res.data[0].wallet_balance
    //   })
    //   .catch(function (error) {
    //       console.log(error);
    //   }); 
    // }, 
  },
  methods: {
    removeFromCart(product) {
      // alert(product)
      //  console.log(product);
      var index = this.cart_list.findIndex(x => x.product_id==product.product_id);                                           
      this.cart_list.splice(index, 1);
      // this.$store.dispatch('central/unsetCartList')
      this.$store.dispatch('central/setCartList', this.cart_list)
      console.log(this.cart_list);             
    },
    getCartList() {
      var cart = this.$store.getters['central/getCartCookies']
      this.cart_list = cart
    },
    formatNumber(number) {
        return parseFloat(number).toFixed(2)
    },

    subTotalAmount () {
        let total = [];
        Object.entries(this.cart_list).forEach(([key, val]) => { 
            total.push(val.product_price * val.product_current_qty) 
        });                
        this.sub_total_amount = total.length != 0 ? this.formatNumber(Math.round(total.reduce(function(total, num) { return total + num }, 0) * 100) / 100): 0
    },
    totalQuantity() {      
        let quantity = [];
        Object.entries(this.cart_list).forEach(([key, val]) => { 
            quantity.push(val.product_current_qty) 
        });                
        this.total_quantity = quantity.length != 0 ? quantity.reduce(function(quantity, num){ return quantity + num }) : 0 
    },
    totalAmount() {
      this.total_amount = parseInt(this.sub_total_amount) + parseInt(this.shipping_fee)
    }
  },
  mounted() {
    this.getCartList()
    this.subTotalAmount()
    this.totalQuantity()
    this.totalAmount()
  },
}
</script>

<style lang="stylus">

</style>
