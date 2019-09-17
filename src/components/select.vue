<template>
  <div>
    <click-outside :handler="handleClickOutside">
      <div class="select" :class="{selected: selectClick}" @click="selectClick = !selectClick">
        <div class="fauxselect">
          <h4>{{attr.title}}</h4>
          <div class="thecolor">
            <span class="colorSpot" :style="{background : licolorSpot}"></span>
          </div>
        </div>
        <ul v-show="selectClick">
          <li
            v-for="(option, index) in options(attr.options)"
            :key="option.image + '-li-' + index"
            :class="{ active: index == selected }"
            @click="selection(index) "
          >
            {{option.name}}
            <span class="colorSpot" :style="{background : option.spotColor}"></span>
          </li>
        </ul>
        <select v-model="selected" name id>
          <option
            v-for="(option, index) in attr.options"
            :key="option.image + '-select-' + index"
            :value="option.name"
          >{{option.name}}</option>
        </select>
      </div>
    </click-outside>
    <img class="imageSelect" :src="imageSelected" />
  </div>
</template>

<script>
import ClickOutside from "onclick-outside";
import slugify from "@sindresorhus/slugify";

export default {
  components: {
    ClickOutside
  },
  name: "passauSelect",
  props: {
    attr: Object,
    indexSelect: Number,
    selected:{
      type:[Boolean, Number],
      default:false
      }
  },
  data() {
    return {
      selectClick: false,
      title: this.attr.title,
      selectedId : false
    };
  },
  methods: {
    handleClickOutside() {
      this.selectClick = false;
    },
    options(options) {
      return options.map(obj => {
        obj.name = this.$parent.rawColor[obj.couleur].title.rendered;
        obj.spotColor = this.$parent.rawColor[obj.couleur].acf.couleur;
        return obj;
      });
    },
    selection: function(id) {
      this.selectedId = id;
    }

  },
  computed: {
    imageVueRender() {
      return this.$parent.imageVue;
    },

    imageSelected() {
      if (typeof this.selectedId !== "number") {
        return false;
      }

      return this.attr.options[this.selectedId][this.imageVueRender];
    },
    liSelected() {
      if (typeof this.selectedId !== "number") {
        return "";
      }
      return this.$parent.rawColor[this.attr.options[this.selectedId].couleur]
        .title.rendered;
    },
    licolorSpot() {
      if (typeof this.selectedId !== "number") {
        return "";
      }
      return this.$parent.rawColor[this.attr.options[this.selectedId].couleur].acf
        .couleur;
    }
  },
  watch:{
    selectedId(){
      this.$parent.selection.color[slugify(this.title)] = {};
      this.$parent.selection.color[slugify(this.title)].color = this.liSelected;
      this.$parent.selection.color[
        slugify(this.title)
      ].imageUrl = this.imageSelected;
      this.$parent.selection.color[slugify(this.title)].id = this.selectedId;
      this.$parent.selection.color[
        slugify(this.title)
      ].indexSelect = this.indexSelect;
    }
  },
  mounted(){
      this.selectedId = this.selected
  }
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.select {
  display: block;
  position: relative;
  z-index: 2;

  .fauxselect {
    background: #fff;
    padding: 20px 20px 20px 42px;
    cursor: pointer;

    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-between;
    border-radius: 60px;
    z-index: 20;
    position: relative;
    .thecolor {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      justify-content: space-between;

      .colorName {
        font-size: 12px;
        line-height: 18px;
        height: auto;
        font-weight: bold;
        color: #818181;
        text-transform: capitalize;
        margin-right: 20px;
      }

      .colorSpot {
        width: 34px;
        height: 34px;
        border-radius: 100%;
        display: block;
      }
    }

    h4 {
      font-family: Barlow;
      font-size: 18px;
      font-weight: 500;
      font-style: normal;
      font-stretch: normal;
      letter-spacing: normal;
      text-transform: capitalize;
      color: #272727;
      margin: 0 0 2px;
    }
  }
  select {
    display: none;
  }

  ul {
    position: absolute;
    top: 50%;
    left: 0;
    list-style: none;
    padding: 50px 0 40px 0;
    margin: 0;
    z-index: 10;
    width: 100%;
    background: #fff;
    border-radius: 0 0 50px 50px;
    font-size: 14px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #272727;

    li {
      padding: 15px 20px 15px 42px;
      position: relative;
      cursor: pointer;
      .colorSpot {
        width: 15px;
        height: 15px;
        border-radius: 100%;
        display: block;
        position: absolute;
        right: 20px;
        top: 17px;
      }

      &.active {
        background: rgba(235, 235, 235, 0.322);
      }
      &:hover {
        background: rgb(241, 241, 241);
      }
    }
  }

  &.selected {
    z-index: 300;
  }
}
</style>
