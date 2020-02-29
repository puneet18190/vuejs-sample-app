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
      <input type="file" ref="inputFile" @change="uploadFile('image')" multiple>Image
      <input type="file" ref="inputVideo" @change="uploadFile('video')" multiple>Video
    </div>

    <div v-if="listMedia">
      <div v-for="(media, index) in media_files" :key="index">
        <input type="text" name="description" @change="setDescription(index)">
      </div>
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
      listMedia: false,
      media_files: [],
    }
  },
  methods: {
    submitCaseFile(){
      var _this = this;
      this.$http.post('/case_files', { payload: this.case_file })
      .then(response => {
        _this.showNewCaseFile = false;
        _this.uploadMedia = true;
        _this.listMedia = false
      })
    },
    uploadFile: function(file_type) {
      // this.inputPicture = this.$refs.inputFile.files;
      // var formData = new FormData()
      // for(var i=0;i<this.inputPicture.length;i++){
      //   formData.append('picture[]', this.$refs.inputFile.files[i]);
      // }
      // var _this = this
      // this.$http.post('/upload_image', formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
      //   console.log('success');
      //   _this.listMedia = true
      //   _this.uploadMedia = false
      //   _this.showNewCaseFile = false
      // }, response => {
      //   console.log('fail');
      // });
      var files = this.$refs.inputFile.files;
      for(var i=0; i < files.length; i++){
        this.media_files.push({ file: files[i], type: file_type })
      }
      this.listMedia = true
      this.uploadMedia = false
      this.showNewCaseFile = false
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