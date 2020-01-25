<template>
  <div class="container">
    <div  v-if="transaction_list.length != 0" >
      <div class="q-mb-lg" v-for="transaction in transaction_list" :key="transaction.id">
        <q-separator color="grey" class="q-mb-lg" inset />
        <div class="row">
          <div class="col-lg-4">
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
          <div class="col-lg-7">
            <div class="shadow-1 q-pa-md">
              <div class="text-subtitle1 text-weight-bold q-mb-md">Product </div>     
                <div class="row" v-for="order in transaction.order" :key="order.id">
                  <div class="col-lg-2">
                    <img style="width:100px" :src="'http://localhost:5000/' + order.product_images[0].product_img_path">
                  </div>
                  <div class="col-10">
                    <div class="row q-pt-sm">
                      <div class="col-10">
                        <div class="col-lg-12 ">
                          <span class="text-primary text-weight-bolder">
                            {{ order.product_name }}
                          </span>
                        </div>
                        <div class="col-12">
                          Brand: {{ order.product_brand }}
                        </div>
                        <div class="col-12">
                          Price: {{ order.cart_price }}
                        </div>
                        <div class="col-12">
                          Quantity: {{ order.cart_quantity }}
                        </div>
                      </div>
                      <div class="col-2">
                        <q-btn 
                          round 
                          dense 
                          color="primary" 
                          icon="visibility" 
                          :to="'/view_product/' + order.product_name" target="_blank"/>                      
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="q-pa-md text-center">
      <span class="text-h5 text-weight-bold">You haven't order yet</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transaction_list: [],
    }
  },
  computed: {
    user_cookies() {
      return this.$store.getters['central/getUserCookies']
    },
  },
  methods: {
    myOrder() {
      this.axios.post('http://localhost:5000/users/my_order', {
        user_email: this.user_cookies.email
      })
      .then(res => {
        this.transaction_list = res.data[0].transactions 
        console.log(this.transaction_list)
      })
    }
  },
  mounted() {
    this.myOrder()
  },
}
</script>