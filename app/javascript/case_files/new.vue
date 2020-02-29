<template>
  <div id="app">
    <p>{{ message }}</p>
    <label>Participant Name:</label>
    <input type="text" name="participant_name" v-model="case_file.participant_name" />
    <br/><br/>
    <label>Location:</label>
    <input type="text" name="location" v-model="case_file.location" />
    <button @click.prevent="submitCaseFile()">Submit</button>
  </div>

</template>

<script type="text/javascript">
import axios from 'axios';

export default {
  data() {
    return {
      message: "New Case File",
      case_file: {
        participant_name: null,
        location: null,
      }
    }
  },
  methods: {
    submitCaseFile(){
      console.log('submitCaseFile', this.case_file);
      var token = document.getElementsByName('csrf-token')[0].content;
      axios.post(`/case_files`, {
        body: this.case_file,
        headers: {
          commom: {
          // 'Content-Type': 'application/json',
          'X-CSRF-Token': token
          }
        }
      })
      .then(response => {
        debugger
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>