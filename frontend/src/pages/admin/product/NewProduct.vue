<template>
  <div class="container">
    <div class="q-pb-md">
      <q-toolbar class="col-sm-12 col-lg-11">
        <q-btn color="primary" text-color="white" icon="keyboard_arrow_left" to="/admin/products"/>
        <q-toolbar-title class="text-h5 text-weight-bold">New Products</q-toolbar-title>
      </q-toolbar>
    </div>
    <form @submit.prevent="onSubmit" enctype="multipart/form-data">
      <div class="row wrap q-gutter-sm justify-center">
        <div class="col-xs-12 col-sm-6 col-md-5 col-lg-4">
          <div class="shadow-2">
            <q-toolbar class="bg-primary text-white">
              <q-toolbar-title class="text-h6 text-weight-regular">Product Information</q-toolbar-title>
            </q-toolbar>     
            <div class="row q-pa-md q-col-gutter-y-md">     
              <div class="col-12">
                <q-input v-model="name" dense label="Name" />
              </div>          
              <div class="col-12">
                <q-input v-model="brand" dense label="Brand" />
              </div> 
              <div class="col-12">
                <div class="row q-col-gutter-x-md q-col-gutter-y-md">
                  <div class="col-6">
                    <q-input v-model="price" dense label="Price" />
                  </div>          
                  <div class="col-6">
                    <q-input v-model="quantity" dense label="Quantity" />
                  </div>      
                </div>
              </div>            
              <div class="col-12">
                  <q-editor v-model="description" min-height="15rem" />
                <!-- <q-input v-model="description" dense type="textarea" label="Description" /> -->
              </div>
              <div class="col-12">
                <q-select :display-value="` ${category_selected ? category_selected.label : ''}`"
                  dense 
                  v-model="category_selected" 
                  :options="category_options" 
                  label="Category" 
                  @input="getSubCategoryOptions"/>
              </div>
              <div class="col-12">
                <q-select :display-value="` ${sub_category_selected ? sub_category_selected.label : ''}`"
                  dense 
                  v-model="sub_category_selected" 
                  :options="sub_category_options" 
                  label="Sub Category"/>
              </div>
              
              <div class="q-pt-md">                
                <q-btn color="primary" text-color="white" label="Add Product" type="submit"/>
              </div>
            </div>  
          </div>
        </div>
        <div class="col-xs-12 col-sm-5 col-md-5 col-lg-4">
          <div class="row">
            <div class="col-12">
              <label for="file-upload" class="custom-file-upload">
                Upload Images
              </label>
              <input id="file-upload" multiple type="file" size="60" ref="files" @change="onSelect" >
            </div>
          </div>
          <div class="row shadow-2 ">
            <div class="col-12">
              <q-scroll-area style="height: 480px;">
                <div class="row shadow-2 q-ma-md q-pa-md" v-for="(file, index) in files" :key="index">
                  <div class="col-11">
                    <div :class="`${ file.invalidMessage == 'Max size 500Kb' ? 'text-negative':'' } ellipsis text-subtitle1 text-weight-bold`">
                        {{ file.name }}
                    </div>
                    <div v-if="file.invalidMessage === 'Max size 500Kb'" class="text-negative">
                      Warning: Max size reach
                    </div>
                    Size: {{ file.size }}Kb
                    <br/>
                  </div>
                  <div class="col-1">
                      <q-btn @click.prevent="files.splice(index, 1);uploadFiles.splice(index, 1)" 
                      color="negative"
                      round 
                      size="10px"
                      icon="delete" />
                  </div>
                </div>
              </q-scroll-area>
              </div>
          </div> 
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  data() {
    return {      
      name: '', 
      brand: '',
      description: '',
      price: '',
      quantity: '',

      category_selected: null,
      category_options: [],

      sub_category_selected: null,
      sub_category_options: [],

      files: [],
      uploadFiles: []
    }
  },
  methods: {
    onSelect() {
      const files = this.$refs.files.files;
      
      this.uploadFiles = [ ...this.uploadFiles, ...files];
      this.files = [
        ...this.files,
        ..._.map(files, file => ({
          name: file.name,
          size: file.size,
          type: file.type,
          invalidMessage: this.validateFile(file)
        }))
      ]
    },
    async onSubmit() {

      const formData = new FormData();
      _.forEach(this.uploadFiles, file => {
          formData.append('files', file)
      });
      formData.append('name', this.name)
      formData.append('brand', this.brand)
      formData.append('price', this.price)
      formData.append('quantity', this.quantity)
      formData.append('description', this.description)
      formData.append('sub_category_selected', this.sub_category_selected ? this.sub_category_selected.value : '')

      try {
        await this.axios.post('http://localhost:5000/products/create_product', formData)
        .then(res => {
          if (res.data.status != undefined) {
            
            this.$q.notify({
              message: res.data.status,
              icon: 'done',
              color: 'accent',
              position: 'top',
            })
            this.$router.push('/admin/products')
          }
        })
      }
      catch(err) {
        console.log(err)
      }
    },
    validateFile (file) {
      const MAX_SIZE = 500000
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

      if (file.size > MAX_SIZE) {
        return `Max size ${MAX_SIZE/1000}Kb`
      }

      if (!allowedTypes.includes(file.type)) {
        return 'Not an image'
      }
    return
    },
    getCategoryOptions() {
      this.axios.get('http://localhost:5000/categories/category_dropdown')
      .then(res => { 
        this.category_options = res.data
      })
    },
    getSubCategoryOptions() {
      this.axios.post('http://localhost:5000/sub_categories/sub_category_dropdown', {
        category_id: this.category_selected ? this.category_selected.value : '' 
      })
      .then(res => { 
        this.sub_category_options = res.data
      })
    },
  },
  mounted() {
    this.getCategoryOptions()
  }
}
</script>

<style>
input[type="file"] {
    display: none;
}
.custom-file-upload {
  font-weight: bold;
  border: 1px solid #ccc;
  display: inline-block;
  padding: 10px 12px;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
