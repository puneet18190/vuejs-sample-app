<template>
  <div id="app">
    <p>{{ message }}</p>
    <div v-if="showNewCaseFile">
      <label>Participant Name:</label>
      <input type="text" name="participant_name" v-model="case_file.participant_name" />
      <br/><br/>
      <label>Location:</label>
      <input type="text" name="location" v-model="case_file.location" />
      <button @click.prevent="submitCaseFile()">Submit</button>
    </div>

    <div v-if="uploadMedia">
      <input type="file" ref="inputFile" @change=uploadFile() multiple>Image
      <input type="file" name="vide" />Video
    </div>
  </div>

</template>

<script type="text/javascript">
// import axios from 'axios';

export default {
  data() {
    return {
      message: "Case File",
      case_file: {
        participant_name: null,
        location: null,
      },
      showNewCaseFile: true,
      uploadMedia: false,
      inputPicture: null,
    }
  },
  methods: {
    submitCaseFile(){
      var _this = this;
      this.$http.post('/case_files', { payload: this.case_file })
      .then(response => {
        _this.showNewCaseFile = false;
        _this.uploadMedia = true;
      })
    },
    uploadFile: function() {
      this.inputPicture = this.$refs.inputFile.files;
      var formData = new FormData()
      for(var i=0;i<this.inputPicture.length;i++){
        formData.append('picture[]', this.$refs.inputFile.files[i]);
      }
      this.$http.post('/upload_image', formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
        // success callback
      }, response => {
        // error callback
      });
    },
  }
}
</script>

<style lang='scss' scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>