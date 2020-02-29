// import TurbolinksAdapter from 'vue-turbolinks'
// import Turbolinks from 'turbolinks'
import Vue from 'vue/dist/vue.esm'
import CaseFilesNew from '../case_files/new.vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
// Vue.use(TurbolinksAdapter)

document.addEventListener('DOMContentLoaded', () => {
  Vue.http.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  var element = document.getElementById('vue');
  if(element != null){
    const app = new Vue({
      el: element,
      components: { CaseFilesNew }
    })
  }
})

// document.addEventListener('turbolinks:load', () => {
//  Vue.http.headers.common['X-CSRF-Token'] = document
//     .querySelector('meta[name="csrf-token"]')
//     .getAttribute('content')
//   var element = document.getElementById('vue');
//   if(element != null){
//     const app = new Vue({
//       el: element,
//       components: { CaseFilesNew }
//     })
//   }
// })
