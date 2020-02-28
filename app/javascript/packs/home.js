import Vue from 'vue/dist/vue.esm'
import HomeIndex from '../home/index.vue'

document.addEventListener('DOMContentLoaded', () => {
  var element = document.getElementById('vue');
  if(element != null){
    const app = new Vue({
      el: element,
      components: { HomeIndex }
    })
  }
})
