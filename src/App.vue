<template>
  <div id="app">
    <form action="">
    <div v-for="(step, index) in rawData" :key="index">
      <div :class="'step step-'+ index " v-show="currentStep == index">
        <img class="imageBase" :src="step.acf.image" :alt="step.acf.title">
        <div class="selector">
          <passauSelect class="passauSelect" v-for="(select, indexSelect) in step.acf.zones" :key="indexSelect"  :attr="select"/>
        </div>
      </div>

    </div>
    <div v-if="currentStep == rawData.length">
      <h1 class="step-title vue">Finaliser votre demande</h1>
      <input type="text" name="Nom" id="" placeholder="Nom">
      <input type="email" name="Courrie" id="" placeholder="Courriel">
      <input type="tel" name="Telephone" id="" placeholder="Téléphone">
    </div>
    </form>
    <div class="navigation">
      <a @click="currentStep--" v-if="currentStep > 0 && currentStep != rawData.length" class="prev">Étape précédente</a>
      <a  @click="currentStep++" v-if="currentStep < rawData.length" class="next">Prochaine étape</a>
    </div>
  </div>
</template>

<script>
import passauSelect from "./components/select.vue"
import axios from "axios";

export default {
  name: 'app',
  components: {
    passauSelect
  },
  mounted () {
    axios
      .get('//passau.eduplessis.com/wp-json/wp/v2/builder/' + window.location.search)
      .then(response => {
        this.rawData = response.data
      })

    axios
    .get('//passau.eduplessis.com/wp-json/wp/v2/builder_color/?per_page=100')
    .then(response =>{
      var rObj = {}

      var resColor = response.data
      for (var i = 0; i < resColor.length; ++i)
        rObj[resColor[i]['id']] = resColor[i];
      
      this.rawColor = rObj
    })
  },
  data () {
    return {
      currentStep:0,
      rawData:false,
      rawColor:{}
    }
  }
}
</script>

<style>
/* @import 'http://passau.eduplessis.com/wp-content/themes/passau/lib/css/app.css';  */
@import url('https://fonts.googleapis.com/css?family=Barlow:400,500');

body{
  background: #eaeaea;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
  
}

.step{
  position: relative;
  width: 1000px;
  margin: 0 auto;
}
.imageBase{
  position: absolute;
  right: 0;
  top: 0;
  width: 200px;
  height: auto;
}
.imageSelect{
  position: absolute;
  right: 0;
  top: 0; 
  width: 200px;
  height: auto;

}
.selector{
  display: grid;
  width: 600px;
  grid-template-columns:  1fr 1fr;
  grid-gap: 20px;

}
.prev{
  font-family: Barlow;
  font-size: 13px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #272727;
}
.next{
  font-family: Barlow;
  font-size: 20px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #00adee;
}

</style>
