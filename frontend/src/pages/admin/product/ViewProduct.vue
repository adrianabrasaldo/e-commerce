<template>
  <div class="container">
    <q-toolbar class="text-primary q-mb-lg q-mt-lg">
      <q-btn round dense icon="navigate_before" @click="backToProductList"/>
      <q-toolbar-title>
        {{ getViewProduct[0].product_name }}
      </q-toolbar-title>
      <q-btn round dense color="primary" icon="edit" @click="edit = !edit"/>
    </q-toolbar>
    <div class="row wrap">        
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <q-card>            
          <img src="https://cdn.quasar.dev/img/parallax2.jpg" >
        </q-card>
      </div>        
      <div class="col-xs-12 col-sm-12 col-md-4 col-lg-5">           
        <div class="q-mb-lg q-ma-md"> 
          <div v-if="edit" class="text-h5 text-weight-bold">
            {{ getViewProduct[0].product_name }}
          </div>
          <q-input filled v-else :value="getViewProduct[0].product_name" class="q-mb-sm"/>
          <div class="q-mt-md">
            <span class="text-subtitle1 text-weight-bold">Quantity</span>
            <div v-if="edit" class="text-subtitle1 text-weight-bold">
              {{ getViewProduct[0].product_quantity }}
            </div>
            <q-input
              :value="getViewProduct[0].product_quantity"
              filled
              v-else 
              type="number"
            />
          </div>
          <div class="q-mt-md">
            <span class="text-subtitle1 text-weight-bold">Description</span>
            <div v-if="edit" class="text-body2 text-justify text-weight-light q-pt-sm">
              {{ getViewProduct[0].product_description }}
            </div>
            <q-input 
              :value="getViewProduct[0].product_description"
              v-else
              filled
              autogrow
              type="textarea"
            />
          </div>
        </div>
      </div>
    </div>

    <ReviewProductComponent :product_name="`${this.$route.params.product_name}`"/>

  </div>
</template>

<script>
import ReviewProductComponent from 'components/admin/product/ReviewProductComponent.vue';

export default {
  components: {
    ReviewProductComponent
  },
  data() {
    return {
      edit:"false",
    }
  },
  computed: {
    getViewProduct() {
      return this.$store.getters['central/getViewProduct']
    }
  },
  methods: {
    backToProductList() {
      this.$router.push({ path:'/admin/products' })
    },
    getProductReviewList() { 
      return this.$store.getters['central/getProductReviewList']
    },
  },
  created() {    
    this.getProductReviewList()
    this.$store.dispatch('central/setViewProduct', this.$route.params.product_name)
  },
  beforeRouteEnter(to, from, next) {    
    if (localStorage.getItem('userrole') != 'admin') {     
      next('/login') 
    }
    else {
      next()
    }
  }
}
</script>

<style <style lang="stylus">

</style>
