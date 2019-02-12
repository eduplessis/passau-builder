<template>
  <div id="app">
    <h1>Créer votre équipement</h1>
    <div v-for="(step, index) in rawData" :key="index">
      <div :class="'step step-'+index" v-if="currentStep == index">
        <img class="imageBase" :src="step.acf.image" :alt="step.acf.title">
        <div class="selector">
          <passauSelect class="passauSelect" v-for="(select, indexSelect) in step.acf.zones" :key="indexSelect"  :attr="select"/>
        </div>
      </div>
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
      .get('http://passau.local/wp-json/wp/v2/builder/')
      // .get('http://passau.eduplessis.com/wp-json/wp/v2/builder/')
      .then(response => {
        this.rawData = response.data
      })
  },
  data () {
    return {
      currentStep:0,
      rawData:false,
      steps:[
        {
          title:'Pad de gardien',
          fldrSrc: 'pad',
          imgSrc: 'padbase',
          selects:[
            {
              name: 'zone1',
              fldrSrc: '/builder-images/pad/',
              options:[
                {
                  name: 'blue',
                  value: 'blue',
                  imgSrc: 'blue'
                },
                {
                  name: 'grey',
                  value: 'grey',
                  imgSrc: 'grey'
                },
                {
                  name: 'yellow',
                  value: 'yellow',
                  imgSrc: 'yellow'
                },
                {
                  name: 'red',
                  value: 'red',
                  imgSrc: 'red'
                }
              ]
            },
            {
              name: 'zone1',
              fldrSrc: '/builder-images/pad/',
              options:[
                {
                  name: 'blue',
                  value: 'blue',
                  imgSrc: 'blue'
                },
                {
                  name: 'grey',
                  value: 'grey',
                  imgSrc: 'grey'
                },
                {
                  name: 'yellow',
                  value: 'yellow',
                  imgSrc: 'yellow'
                },
                {
                  name: 'red',
                  value: 'red',
                  imgSrc: 'red'
                }
              ]
            },
            {
              name: 'zone1',
              fldrSrc: '/builder-images/pad/',
              options:[
                {
                  name: 'blue',
                  value: 'blue',
                  imgSrc: 'blue'
                },
                {
                  name: 'grey',
                  value: 'grey',
                  imgSrc: 'grey'
                },
                {
                  name: 'yellow',
                  value: 'yellow',
                  imgSrc: 'yellow'
                },
                {
                  name: 'red',
                  value: 'red',
                  imgSrc: 'red'
                }
              ]
            }
          ]

        },
        {
          title:'Pad de gardien',
          fldrSrc: 'pad',
          imgSrc: 'padbase',
          selects:[
            {
              name: 'zone1',
              fldrSrc: '/builder-images/pad/',
              options:[
                {
                  name: 'blue',
                  value: 'blue',
                  imgSrc: 'blue'
                },
                {
                  name: 'grey',
                  value: 'grey',
                  imgSrc: 'grey'
                },
                {
                  name: 'yellow',
                  value: 'yellow',
                  imgSrc: 'yellow'
                },
                {
                  name: 'red',
                  value: 'red',
                  imgSrc: 'red'
                }
              ]
            }
          ]

        }
      ]
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
.passauSelect{
}

</style>
