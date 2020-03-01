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
      <input type="file" ref="inputFile" @change="onFileChange($event)" multiple>Image
      <input type="file" ref="inputVideo" @change="onFileChange('video')" multiple>Video
    </div>

    <div v-if="listMedia">
      <div v-for="(media, index) in media_files" :key="index">
        <p>Media type: {{ media.type }}</p>
        <img :src="media.image" />
        <textarea name="description" @change="setDescription(media, index, $event)" />
      </div>
      <button @click.prevent="createCaseFile()">Submit</button>
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
      this.message = this.case_file.participant_name + ' '+ this.case_file.location;
      // this.$http.post('/case_files', { payload: this.case_file })
      // .then(response => {
        _this.showNewCaseFile = false;
        _this.uploadMedia = true;
        _this.listMedia = false
      // })
    },
    onFileChange: function(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      for(var i=0; i < files.length; i++){
        this.createImage(files[i]);
      }
      this.listMedia = true
      this.uploadMedia = false
      this.showNewCaseFile = false
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();

      reader.onload = (e) => {
        this.media_files.push({ file: file, type: 'image', image: e.target.result })
      };
      reader.readAsDataURL(file);
    },
    setDescription(media, index, e){
      var description = e.target.value
      media["description"] = description
    },
    createCaseFile(){
      var _this = this
      var payload = {
        participant_name: this.case_file.participant_name,
        location: this.case_file.location,
        media_files: this.media_files,
      }
      var formData = new FormData()
      formData.append('participant_name', this.case_file.participant_name)
      formData.append('location', this.case_file.location)
      for(var i=0;i<this.media_files.length;i++){
        formData.append('media_files['+i+'][file]', this.media_files[i].file);
        formData.append('media_files['+i+'][description]', this.media_files[i].description);
      }
      this.$http.post('/case_files', formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
        console.log('success');
      }, response => {
        console.log('fail');
      });
    }
  }
}
</script>

<style lang='scss' scoped>
p {
  font-size: 2em;
  text-align: center;
}
img {
  width: 150px;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
textarea{
  width: 30%;
  margin: auto;
  display: block;
}
</style>