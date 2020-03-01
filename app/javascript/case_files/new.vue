<template>
  <div id="app">
    <div class="container-contact100">
      <div class="wrap-contact100">
        <form class="contact100-form validate-form">
          <span class="contact100-form-title">{{ message }} </span>

          <div v-if="showNewCaseFile">
            <div class="wrap-input100 validate-input" data-validate="Participant Name is required">
              <span class="label-input100">Participant Name</span>
              <input class="input100" type="text" name="participant_name" placeholder="Enter Participant Name" v-model="case_file.participant_name">
              <!-- <span class="focus-input100"></span> -->
            </div>
            <div class="wrap-input100 validate-input" data-validate="Location is required">
              <span class="label-input100">Location</span>
              <input class="input100" type="text" name="location" placeholder="Location" v-model="case_file.location">
              <!-- <span class="focus-input100"></span> -->
            </div>

            <div class="container-contact100-form-btn">
              <div class="wrap-contact100-form-btn">
                <div class="contact100-form-bgbtn"></div>
                <button class="contact100-form-btn" @click.prevent="submitCaseFile()">
                  <span>Submit<i class="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i></span>
                </button>
              </div>
            </div>
          </div>

          <div v-if="uploadMedia">
            <div class="wrap-input100">
              <span class="label-input100">Image</span>
              <input class="input100" type="file" @change="onFileChange($event)" multiple>
            </div>

            <div class="wrap-input100">
              <span class="label-input100">Video</span>
              <input class="input100" type="file" @change="onFileChange($event)" multiple>
            </div>
          </div>  

          <div v-if="listMedia">
            <div v-for="(media, index) in media_files" :key="index">
              <div class="">
                <img :src="media.image" />
              </div>
              
              <div class="wrap-input100 validate-input" data-validate="Description is required">
                <span class="label-input100">Description</span>
                <textarea class="input100" name="description" placeholder="Your description here..." @change="setDescription(media, index, $event)"></textarea>
                <!-- <span class="focus-input100"></span> -->
              </div> 
            </div>

            <div class="container-contact100-form-btn">
              <div class="wrap-contact100-form-btn">
                <div class="contact100-form-bgbtn"></div>
                <button class="contact100-form-btn" @click.prevent="createCaseFile()">
                  <span>Submit<i class="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i></span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script type="text/javascript">
// import axios from 'axios';

export default {
  data() {
    return {
      message: "New Case File",
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
        alert('Submitted successfully.')
        this.resetCaseFile();
      }, response => {
        console.log('fail');
      });
    },
    resetCaseFile(){
      this.message = "New Case File";
      this.case_file.participant_name = null;
      this.case_file.location = null;
      this.showNewCaseFile = true;
      this.uploadMedia = false;
      this.inputPicture = null;
      this.listMedia = false;
      this.media_files = [];
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

</style>