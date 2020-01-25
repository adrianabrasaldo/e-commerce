<template>
  <div class="container">
    <q-banner v-if="banner" :class="`${banner_color} text-white q-mb-md `">    
      <template v-slot:avatar>
        <q-icon name="warning" size="1em" />
      </template>       
      {{ banner_message }}
    </q-banner>     
    <div class="row wrap q-gutter-sm justify-center">
      <div class="col-xs-12 col-sm-9 col-md-6 col-lg-3 flex-center">        
        <q-card class="q-pb-md">
          <q-toolbar dark class="bg-primary text-white">
            <q-toolbar-title class="text-subtitle1 text-weight-bold">
              New Category
            </q-toolbar-title>
          </q-toolbar>
          <q-card-section>
            <div class="row q-gutter-md">
              <div class="col-9">
                <q-input dense v-model="category_name" v-on:keyup="keyEvent($event, 'Category')" label="Enter category"/>
              </div>
              <div class="col-1">
                <q-btn dense @click="onNewAddCategory" @click.prevent icon="save_alt" color="primary">
                  <q-tooltip anchor="top middle" self="top middle">
                    Save new category
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <br/>

        <q-card class="q-pb-md">
          <q-toolbar dark class="bg-accent text-white">
            <q-toolbar-title class="text-subtitle1 text-weight-bold">
              New Sub Category
            </q-toolbar-title>
          </q-toolbar>
          <q-card-section>
            <div class="column q-col-gutter-y-sm">
              <div class="col-12">
                <q-select 
                  :display-value="` ${category_selected ? category_selected.label : ''}`"
                  dense 
                  v-model="category_selected" 
                  :options="category_options" 
                  label="Category" />
              </div>
              <div class="col-12">
                <div class="row q-gutter-md">
                  <div class="col-9">
                    <q-input dense v-model="subcategory_name" v-on:keyup="keyEvent($event, 'Sub')" label="Enter Sub Category"/>
                  </div>
                  <div class="col-1">
                    <q-btn dense @click="onNewAddSubCategory" @click.prevent icon="save_alt" color="primary">
                      <q-tooltip anchor="top middle" self="top middle">
                        Save new category
                      </q-tooltip>
                    </q-btn>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>   

      </div>
      <div class="col-xs-12 col-sm-9 col-md-6 col-lg-4 flex-center">
        <div class="shadow-2 q-pa-md">
          <div class="text-h6 text-weight-bold">
            Category and Sub Category List
          </div>
          <q-input class="q-mb-md" dense  v-model="filter" ef="filter" label="Search">
            <template v-slot:append>
              <q-icon v-if="filter !== ''" name="clear" class="cursor-pointer" @click="resetSearch" />
            </template>
          </q-input>
           <q-tree
            :nodes="category_list"
            node-key="label"
            :filter="filter"
          />
        </div>
      </div>
    </div>   
  </div>
</template>

<script>

export default {
  data () {
    return {
      category_selected: null,
      category_options: [],

      category_name: '',
      subcategory_name: '',
      
      banner_color: '',
      banner_message: '',
      banner: false,
      
      
      filter: '',
      category_list: []
    }
  },
  methods: {
    resetSearch () {
      this.filter = ''
      this.$refs.filter.focus()
    },
    keyEvent: function(e, type) {
      if (e.keyCode === 13) {
        if (type === 'Category') {
          this.onNewAddCategory()
        }
        else if (type === 'Sub') {
          this.onNewAddSubCategory()
        }
      }          
    },    

    getCategoryOptions: function() {
      this.axios.get('http://localhost:5000/categories/category_dropdown')
      .then(res => { 
        this.category_options = res.data
      })
    },

    getCategoryTree: function() {
      this.axios.get('http://localhost:5000/categories/categories')
      .then(res => { 
        this.category_list = res.data
      })
    },
    onNewAddCategory: function() {
      if(this.category_name !== '') {
        this.axios.post('http://localhost:5000/categories/createCategory', {
          category_name: this.category_name
        })
        .then(res => {       
          if(res.data.error === 'Category name already exist') {
            this.bannerMessage('bg-negative', res.data.error, true)
          }
          else {
            this.category_name = '',            
            this.bannerMessage('bg-orange-10', '', false)            
            this.getCategoryTree()
            this.getCategoryOptions()
            
            this.$q.notify({
              message: res.data.status,
              icon: 'done',
              color: 'accent',
              position: 'top',
            })
          }        
        })
      }
      else {        
        this.bannerMessage('bg-orange-10', 'Please enter category name', true)
      }
    },
    onUpdateCategory: function(value, initialValue) {
      this.axios.post('http://localhost:5000/categories/updateCategory', {
        old_category: initialValue,
        new_category: value
      })
      .then(res => {        
        this.$q.notify({
          message: res.data.status? res.data.status : res.data,
          icon: 'done',
          color: 'accent',
          position: 'top',
        })
      })
    },

    onNewAddSubCategory: function() {
      if(this.subcategory_name !== '') {
        this.axios.post('http://localhost:5000/sub_categories/createSubCategory', {
          sub_category_name: this.subcategory_name,
          category_id: this.category_selected ? this.category_selected.value : '' 
        })
        .then(res => {                    
          if(res.data.error === 'Sub Category name already exist') {
            this.bannerMessage('bg-negative', res.data.error, true)
          }
          else {
            this.category_name = '',              
            this.bannerMessage('bg-orange-10', '', false)              
            this.getCategoryTree()
            this.getCategoryOptions()
            
            this.$q.notify({
              message: res.data.status,
              icon: 'done',
              color: 'accent',
              position: 'top',
            })
          } 
        })
      }
      else {        
        this.bannerMessage('bg-orange-10', 'Please enter sub category name', true)
      }
    },

    bannerMessage: function(color, message, bool) {
      this.banner_color = color
      this.banner_message = message
      this.banner = bool
    }
  },
  created() {
    this.getCategoryTree()
    this.getCategoryOptions()
  },
}
</script>

<style lang="stylus">
.my-sticky-column-table
  /*
    specifying max-width so the example can
    highlight the sticky column on any browser window
  */
  max-width 100%

  /* bg color is important for th; just specify one */
  thead tr:first-child th:first-child
    background-color #ffff
    opacity 10

  td:first-child
    background-color #f5f5dc
    width 5px
  td:nth-child(2)
    font-weight:bold
  td:nth-child(2), td:nth-child(3), td:nth-child(4)
    background-color white
    width 2px

  thead tr:first-child th:first-child,
  td:first-child
    position sticky
    left 0
    z-index 1
</style>



























        <!-- <q-table     
          title="Category List"
          class="my-sticky-column-table"
          :grid="$q.screen.lt.sm"       
          :data="category_list"
          :columns="table_columns"
          row-key="name"
          :filter="table_filter"    
          :loading="table_loading"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id" :props="props">
                {{ props.row.category_id }}
              </q-td>
              <q-td key="category" :props="props">
                {{ props.row.category_name }}
                <q-popup-edit 
                  buttons 
                  title="Update Category"
                  label-set="Update"
                  v-model="props.row.category_name" 
                  @save="onUpdateCategory">
                  <q-input v-model="props.row.category_name" dense autofocus />
                </q-popup-edit>
              </q-td>       
            </q-tr>
          </template>
          <template v-slot:top-right>
            <q-input filled clearable dense debounce="300" v-model="table_filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
        </q-table> 
        
      // table_loading: false,
      // table_filter:'',
      // table_columns: [
      //   { name: 'id', align: 'left', label: 'No.', field: 'id' },
      //   { name: 'category', align: 'center', label: 'Name', field: 'category' }
      // ],
      
      -->


        