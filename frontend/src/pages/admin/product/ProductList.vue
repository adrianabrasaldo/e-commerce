<template>
  <div class="container">   
    <div class="q-pb-md">
      <div class="row">
        <q-toolbar class="col-sm-10 col-lg-11">
        <q-toolbar-title class="text-h5 text-weight-bold">Products</q-toolbar-title>
        <q-input dense v-model="search" label="Search">
          <template v-slot:append>
            <q-icon v-if="search !== ''" name="close" @click="search = ''" class="cursor-pointer" />
            <q-icon name="search" />
          </template>
        </q-input>
        </q-toolbar>
        <q-toolbar class="col-sm-2 col-lg-1">
        <q-btn color="primary" text-color="white" icon="add" to="/admin/new-product"/>
        </q-toolbar>
      </div>
    </div>
    <div class="row q-gutter-y-md">
      <div class="col-xs-12 col-sm-4 col-md-4 col-lg-3"
        v-for="product in product_list['product']" :key="product.id">      
        <router-link :to="`/admin/view_product/${product.name}`" tag="div">
          <q-card class="my-card">     
           <img :src="'http://localhost:5000/'+product.path"/> 
            <q-card-section>
              <div class="text-subtitle1 text-weight-bold ellipsis">{{ product.name }}
                <q-tooltip anchor="top middle" self="top middle">
                  {{ product.name }}
                </q-tooltip>
              </div>
              <div class="text-subheading1 text-primary">
                Qty: {{ product.quantity }}
              </div>
              <div class="text-subheading2 text-primary">
                Price: ₱{{ product.price }}
              </div>
              <q-rating
                :value="product.rating / product.count"
                size="1.3em"
                color="orange"
                readonly
              />
            </q-card-section>
          </q-card>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      search: '',
      product_list: []
    }
  },
  computed: {
  },
  methods: {
    get_product_list() {
      this.axios.get('http://localhost:5000/products/products').then((res) => {
        this.product_list = res.data
        console.log(res.data)
      })
    }  
  },
  mounted() {
    this.get_product_list()
  },
}
</script>

<style lang="stylus" scoped>
.my-card
  width 90%
  max-width 250px
  cursor pointer
</style>