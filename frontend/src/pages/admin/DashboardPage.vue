<template>
    <div class="container">
        <div class="text-h5 text-weight-bold">
            Dashboard
        </div>
        <div class="row wrap q-gutter-md flex-center">        
            <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3">
                <q-card class="my-card">
                    <q-card-section>
                        <div class="text-subtitle1 text-weight-bold">
                            Product Sold
                        </div>
                    </q-card-section>
                        <q-separator/>
                    <q-card-section class="text-center">
                        <q-circular-progress
                            class="text-white"
                            show-value
                            font-size="18px"
                            :value="productSoldPercent"
                            size="120px"
                            :thickness="0.15"
                            track-color="yellow-9"
                            color="green-9"
                            center-color="grey-9"
                        >
                            {{ productRemain }} %
                        </q-circular-progress>
                    </q-card-section>
                        <q-separator/>
                    <q-expansion-item
                        icon=""
                        :label="`${productSoldPercent}% of Product has been sold`"
                        caption=""
                    >
                        <q-card-section>
                            <span class="text-weight-bold">
                                {{ this.productSold }}
                            </span> out of your 
                            <span class="text-weight-bold">
                                {{ this.productRemain }}
                            </span> products has been sold
                        </q-card-section>
                    </q-expansion-item>
                </q-card>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3">
                <q-card class="my-card">
                    <q-card-section>
                        <div class="text-subtitle1 text-weight-bold">Total Sales</div>
                    </q-card-section>
                    <q-separator/>
                    <q-card-section class="text-center">
                        <q-circular-progress
                            class="text-white"
                            show-value
                            font-size="18px"
                            :value="productSoldPercent"
                            size="120px"
                            :thickness="0.15"
                            track-color="yellow-9"
                            color="green-9"
                            center-color="grey-9"
                        >
                        {{ productRemain }} %
                        </q-circular-progress>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            productSold: 3
        }
    },
    computed: {
        productSoldPercent: function() {
            var divide = this.productSold / this.productRemain;
            return divide * 100
        },    
        productRemain: function() {
            return this.$store.getters['central/getProductCount']
        }
    },
    methods: {
        setProductList() {
            this.$store.dispatch('central/setProductList')
        }  
    },
    mounted() {
        this.setProductList()  
        this.$store.dispatch('central/setProductList')  
    }
}
</script>

<style lang="stylus" scoped>
.my-card
    width 100%
    max-width 290px
</style>