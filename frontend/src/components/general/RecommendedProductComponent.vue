<template>
  <div class="container">    
    <div class="text-h5 text-weight-regular q-mt-lg q-mb-lg">
      Recommended For You
    </div>
    <swiper :options="swiperOption">
      <swiper-slide v-for="recommended in recommended_list['recommended']" :key="recommended.id">   
        <router-link :to="'/view_product/' + recommended.name" tag="div">
          <q-card class="my-card">
            <img :src="'http://localhost:5000/' + recommended.path">
            <div class="col q-pa-sm">
              <div class="ellipsis">{{ recommended.name }}</div>
              <div class="text-h6 text-weight-regular text-green">₱{{ recommended.price }}</div>
              
              <q-rating
                :value="recommended.rating / recommended.count"
                size="1.3em"
                color="orange"
                readonly
              />
            </div>
            
          </q-card> 
        </router-link>  
      </swiper-slide> 
    </swiper>
    <!-- If we need pagination -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      recommended_list: [],
      swiperOption: {
        centeredSlides: false,
        loop: false,
        slidesPerView: 4,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar',
          clickable: true,
        },
        breakpoints: {          
          320: { slidesPerView: 1, spaceBetween: 10 },
          480: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 10 },
          1080: { slidesPerView: 3, spaceBetween: 10
          }
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    getRecommendedProducts() {
      this.axios.get('http://localhost:5000/products/recommended_products').then((response) => {
        this.recommended_list = response.data
      })
    }
  },
  mounted() {
    this.getRecommendedProducts()
  }
}
</script>

<style lang="stylus" scoped>
.my-card
  width 100%
  max-width 450px
  cursor pointer
</style>