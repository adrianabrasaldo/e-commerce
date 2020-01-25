<template>
  <div class="container">
    <q-breadcrumbs class="text-green-10 text-weight-bold q-mb-lg q-mt-lg" active-color="primary">
      <template v-slot:separator>
        <q-icon
          size="1.2em"
          name="arrow_forward"
          color="primary"
        />
      </template>
      <q-breadcrumbs-el label="Home" icon="home" to="/home"/>
      <q-breadcrumbs-el label="Products" icon="list" />
      <q-breadcrumbs-el :label="view_product.product_name" icon="" />
    </q-breadcrumbs>
    
    <div class="row wrap">  
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <q-card> 
          <q-carousel
            swipeable
            animated
            v-model="slide"
            thumbnails
            arrows
            infinite
            :fullscreen.sync="fullscreen"
          >
            <q-carousel-slide 
            v-for="images in view_product['product_images'] " 
            :key="images.product_img_id"
            :name="images.product_img_id" 
            :img-src="'http://localhost:5000/' + images.product_img_path" 
          />
              <template v-slot:control>
              <q-carousel-control
                position="bottom-right"
                :offset="[18, 18]">
              <q-btn
                push 
                round 
                dense 
                color="white" 
                text-color="primary"
                :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="fullscreen = !fullscreen"/>
              </q-carousel-control>
              </template>
          </q-carousel>
        </q-card>
      </div>        
      <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">           
        <div class="q-ma-md"> 
          <div class="text-h5 text-weight-bold">
            {{ view_product.product_name }}
          </div>
          <div class="text-subtitle2">Brand: {{  view_product.product_brand }}</div>
          <div class="q-mt-md">
            <h5 class="text-h5 text-weight-bold text-green-10">₱{{  view_product.product_price }}</h5>
          </div>
          <div 
            class="q-mt-md" 
            v-if="getUserCookies.role != 'admin'">            
            <div class="row q-gutter-md">  
              <q-btn 
                :disabled="maximum_quantity == 0? true : false"
                dense 
                round 
                color="negative" 
                icon="remove" 
                @click="reduceQuantity"
              />
              <q-input 
                :disabled="maximum_quantity == 0? true : false"
                dense          
                readonly  
                v-model="current_quantity" 
                @keypress="isNumber($event)"
                @keydown="onInput($event)"                
                style="width: 50px;" 
              />
              <q-btn 
                :disabled="maximum_quantity == 0? true : false"
                dense 
                round 
                color="primary" 
                icon="add" 
                @click="addQuantity" /> 
            </div>           
          </div>
          <div class="q-mt-md" v-if="getUserCookies.role != 'admin'">
              <div class="row q-gutter-md">
                <q-btn 
                  label="Add to Wish List" 
                  color="red" 
                  icon="favorite"/>
                <q-btn 
                  v-if="maximum_quantity != 0"
                  label="Add to Cart" 
                  color="primary" 
                  icon="shopping_cart" 
                  @click="addToCartList(view_product)"/>
                <span v-else class="text-subtitle1 text-weight-bolder text-negative"> Out of Stock </span>
              </div>
          </div>
          <div class="q-mt-md">
            <span class="text-subtitle1 text-weight-bold">Description</span>
            <div class="text-body2 text-justify text-weight-light q-pt-sm" v-html="view_product.product_description"></div>
          </div>
        </div>
      </div>
    </div>
 
    <ReviewProductComponent :product_name="`${this.$route.params.product_name}`"/> 
    <RecommendedProductComponent/> 
  
  </div>
</template>

<script>

import ReviewProductComponent from 'components/general/ReviewProductComponent.vue';
import RecommendedProductComponent from 'components/general/RecommendedProductComponent.vue'

export default {
  components: {
    ReviewProductComponent,
    RecommendedProductComponent
  },
  data() {
    return {
      slide: 1,
      fullscreen: false,
      view_product: [],
      current_quantity: 1,
      maximum_quantity: 0,
    }
  },
  computed: {
    getUserCookies() {
      return this.$store.getters['central/getUserCookies']
    }  
  },
  methods: {
    get_view_product(product_name) {
      this.axios.post("http://localhost:5000/products/view_product", {
        product_name: product_name
      })
      .then((res) => { 
        this.view_product = res.data['product']
        this.maximum_quantity = this.view_product.product_quantity   
        this.slide = this.view_product.product_images[0].product_img_id
      })
    },
    addToWishList() {

    },
    addToCartList(product) {
       
      var cookies = JSON.parse(localStorage.getItem('vuex'))
      if (cookies != null) {
        if (cookies.central.user_cookies != 0) {
          //  AD LOGICAL HERE
          var product_images = []
          product.product_images.forEach(e => { product_images.push(e.product_img_path); })

          this.$store.dispatch('central/setCartList', {
            product_id:           product.product_id, 
            product_name:         product.product_name, 
            product_price:        product.product_price,  
            product_quantity:     product.product_quantity,
            product_max_qty:      product.product_quantity,
            product_current_qty:  this.current_quantity,
            product_images:  product_images             
          })
          
          this.$q.notify({
            message: product.product_name + " Product successfully added to cart",
            icon: 'check_circle',
            color: 'primary',
            position: 'top',
          })
          
          this.$router.push('/my_cart')
        }
        else {
          this.$router.push('/login')
        }
      }
      else {
          this.$router.push('/login')
      }
    },
    addQuantity() {
      if (this.current_quantity < this.maximum_quantity) {
        this.current_quantity += 1
      }
    },
    reduceQuantity() {
      if (this.current_quantity >= 2) {
        this.current_quantity -= 1
      }
    }
  },  
  beforeRouteUpdate (to, from, next) {
    this.get_view_product(to.params.product_name)
    next()
  },
  created() {
    this.get_view_product(this.$route.params.product_name)
  }
}
</script>

<style <style lang="stylus">
</style>
