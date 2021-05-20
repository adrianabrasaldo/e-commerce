<template>
    <div class="q-mt-lg q-mb-lg">    
        <div class="shadow-1 q-pa-lg">
            <div class="text-h6 text-weight-bold">
                Overall Rating
            </div>
            <div class="row wrap items-center">
                <div class="col-xs-12 col-md-4 col-lg-4">
                    <div>                     
                        <span class="text-h2">
                            {{ isNaN(overall_rating)? "0": overall_rating }}
                        </span>
                        <span class="text-h4">
                            /5
                        </span>
                    </div>
                    <q-rating
                        :value="overall_rating"
                        class="q-mb-sm"
                        size="2.4em"
                        color="orange"
                        readonly
                    />
                </div>
            </div>
        </div>

        <div class="shadow-2 q-pa-md">
            <span 
                v-if="review_list_length != 0" 
                class="text-h6 text-weight-bold">
                    Product Ratings & Preview
            </span>
            <div v-else class="text-heading text-weight-bold text-center">
                <q-icon 
                    name="mood" 
                    style="font-size: 40px;" 
                />
                <div>
                    This product has not received a written review yet. <br>
                    Let others know what do you think and be the first to write a review.
                </div>
            </div>
        </div>
        <q-list 
            bordered 
            class="shadow-1 q-pa-xs" 
            v-for="review in review_list" :key="review.id"
        >
            <q-item class="q-mt-md">
                <q-item-section>
                    <q-item-label class="text-heading text-weight-bold">
                        {{ review.user_firstname + " " + review.user_lastname }}
                    </q-item-label>
                    <q-item-label  lines="3">
                        {{ review.review_comment }}
                    </q-item-label>
                </q-item-section>
                <q-item-section side>
                    <q-item-label caption>{{ review.date }}</q-item-label>
                        <q-rating
                        v-model="review.review_rating"
                        size="1.5em"
                        color="orange"
                        readonly
                    />
                </q-item-section>
            </q-item>
            <q-item>            
                <q-btn-toggle
                    v-model="model"
                    dense
                    flat
                    size="smd"
                    no-caps
                    toggle-color="green-10"        
                    :options="[
                        {icon: 'thumb_up_alt', value: '1', color:'grey'},
                        {icon: 'thumb_down_alt', value: '0', color:'grey'}
                    ]"
                />       
                <!-- <q-btn-toggle options="Like" dense round flat color="primary" size="sm" icon="thumb_up_alt"/> <span>1.6k</span>
                <q-btn-toggle options="Like" dense round flat color="negative" size="sm" icon="thumb_down_alt"/>                     -->
            </q-item>
        </q-list>
    </div>
</template>

<script>
export default {
    name: 'ReviewProductComponent',
    props: ['product_name'],
    data() {
        return {
            review_list: [],
            model: 'like'
        }
    },
    computed: {
        overall_rating() {
            var length = this.review_list_length();
            var rating = 0;
            this.review_list.forEach(e => { rating += e.review_rating; });
            var overall =  isNaN(rating / length)? 0: rating / length 
            return overall
        }
    },
    methods: {
        get_product_review() {
            this.axios.post('http://localhost:5000/reviews/product_reviews', {
                product_name: this.product_name
            })
            .then((res) => {    
                this.review_list = res.data['reviews']
            })
        },
        review_list_length() {
            return this.review_list.length
        }
    },
    watch: {
        '$route'() {
            this.get_product_review()
        }
    },
    created() {
        this.get_product_review()
    }
}
</script>