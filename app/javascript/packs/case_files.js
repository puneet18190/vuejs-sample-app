import Vue from 'vue/dist/vue.esm'
import CaseFilesNew from '../case_files/new.vue'

document.addEventListener('DOMContentLoaded', () => {
  var element = document.getElementById('vue');
  if(element != null){
    const app = new Vue({
      el: element,
      components: { CaseFilesNew }
    })
  }
})
