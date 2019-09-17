<template>
  <div id="app">
    <form action>
      <div v-for="(step, index) in rawData" :key="'passau' + index">
        <div :class="'step step-'+ index " v-show="currentStep == index">
          <img class="imageBase" :src="step.acf[imageVue]" :alt="step.acf.title" />
          <div
            class="selectVue"
            v-if="!(typeof step.acf.image_2 == 'undefined' || step.acf.image_2 == false)"
          >
            <a @click.stop="imageVue = 'image'">
              <img :src="step.acf.image" alt />
            </a>
            <a @click.stop="imageVue = 'image_2'">
              <img :src="step.acf.image_2" alt />
            </a>
          </div>
          <div class="selector">
            <passauSelect
              class="passauSelect"
              v-for="(select, indexSelect) in step.acf.zones"
              :key="step.acf.design + '-' + step.acf.types_dequipement + '-' + indexSelect"
              :attr="select"
              :indexSelect="indexSelect"
              :selected="selected(indexSelect)"
            />
          </div>
        </div>
      </div>
    </form>
    <div class="navigation">
      <a @click="prev" v-if="currentStep > 0 " class="prev">Étape précédente</a>
      <a @click="next" v-if="currentStep < rawData.length" class="next">Prochaine étape</a>
    </div>
    <button class="saveit" @click="setStorage">save</button>
  </div>
</template>

<script>
import passauSelect from "./components/select.vue";
import axios from "axios";

var baseUrl = "//passau.eduplessis.com";
if (typeof passau_home_url !== "undefined") {
  baseUrl = passau_home_url;
}
export default {
  name: "app",
  components: {
    passauSelect
  },
  data() {
    return {
      currentStep: 0,
      rawData: false,
      rawColor: {},
      selection: {
        product: "",
        base: {},
        color: {},
        type: "",
        family: ""
      },
      loadSelection: {},
      imageVue: "image",
      selectionUniKey: ""
    };
  },
  methods: {
    prev() {
      this.currentStep--;
      this.$cookie.set("passau", JSON.stringify(this.selection), 1);
    },
    next() {
      this.$cookie.set("passau", JSON.stringify(this.selection), 1);
      window.location.search = "?step=3" + window.location.search.slice(7);
    },
    setStorage() {
      if (!localStorage.getItem("passau"))
        localStorage.setItem("passau", JSON.stringify({}));

      var passauStorage = JSON.parse(this.getStorage());

      passauStorage[this.selectionUniKey] = {
        selection: this.selection,
        date: Date.now()
      };

      return localStorage.setItem("passau", JSON.stringify(passauStorage));
    },
    getStorage() {
      return localStorage.getItem("passau");
    },
    clearCookie() {
      this.eraseCookie("passau");
    },
    eraseCookie(name) {
      document.cookie = name + "=; Max-Age=-99999999;";
    },
    loadsaved() {
      if (!localStorage.getItem("loadpassau")) return;

      var loadpassau = JSON.parse(localStorage.getItem("loadpassau"));
      // console.log(loadpassau);
      for (let [key, value] of Object.entries(loadpassau.color)) {
        this.loadSelection[value.indexSelect] = value.id;
      }

      localStorage.removeItem("loadpassau");
    },
    selected(keySearch) {
      if (keySearch in this.loadSelection) return this.loadSelection[keySearch];

      return false;
    }
  },
  mounted() {
    axios
      .get(baseUrl + "/wp-json/wp/v2/builder/" + window.location.search)
      .then(response => {
        this.rawData = response.data;
        this.selection.product = this.rawData[0].title.rendered;
        this.selection.base = this.rawData[0].acf.image;
        this.selection.type = this.rawData[0].acf.types_dequipement;
        this.selection.family = this.rawData[0].acf.design;
      });

    axios
      .get(baseUrl + "/wp-json/wp/v2/builder_color/?per_page=100")
      .then(response => {
        var rObj = {};

        var resColor = response.data;
        for (var i = 0; i < resColor.length; ++i)
          rObj[resColor[i]["id"]] = resColor[i];

        this.rawColor = rObj;

        this.clearCookie();
        this.loadsaved();
      });

    this.selectionUniKey = Math.floor(
      Math.random() * Math.floor(100) + Date.now()
    );
  }
};
</script>
<style lang="scss">
/* @import 'http://passau.eduplessis.com/wp-content/themes/passau/lib/css/app.css';  */
@import url("https://fonts.googleapis.com/css?family=Barlow:400,500");

body {
  background: #eaeaea;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}

.step {
  position: relative;
  width: 1000px;
  margin: 0 auto;
}
.imageBase {
  position: absolute;
  right: 0;
  top: 0;
  width: 320px;
  height: auto;
}
.imageSelect {
  position: absolute;
  right: 0;
  top: 0;
  width: 320px;
  height: auto;
}
.selector {
  display: grid;
  width: 600px;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}
.prev {
  font-family: Barlow;
  font-size: 13px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #272727;
  cursor: pointer;
}
.next {
  font-family: Barlow;
  font-size: 20px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #00adee;
  cursor: pointer;
}

.selectVue {
  a {
    overflow: hidden;
    display: inline-block;
    cursor: pointer;
    height: 35px;
    width: 35px;
    background: #fff;
    border-radius: 100%;
    img {
      width: 75%;
      height: 75%;
      object-fit: cover;
      transform: translate(15%, 15%);
    }
  }
}
.saveit {
  background-color: #272727;
  background-image: url(assets/icons8-download-24-normal.png);
  background-position: center center;
  background-repeat: no-repeat;
  text-indent: -9999em;
  padding: 15px 25px;
  border-radius: 50px;
  width: auto;
  display: inline-block;
  font-size: 17px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  border: none;
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 9999;
  &:hover {
    background-image: url(assets/icons8-download-24.png);
    background-color: #fff;
    border: 1px solid #00adee;
    color: #00adee;
  }
}
</style>
