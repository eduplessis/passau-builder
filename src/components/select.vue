<template>
  <div>
    <div class="select" :class="{selected: selectClick}" @click="selectClick = !selectClick">
      <div class="fauxselect">
        <h4>{{attr.name}}</h4>
        <div class="thecolor">
          <span class="colorName">{{liSelected}}</span>
          <span class="colorSpot" :style="{'background-color': liSelected}"></span>
        </div>
      </div>
      <ul v-show="selectClick">
        <li v-for="(option, index) in attr.options" :key="option.image" :class="{ active: index == selected }" @click="selected = index">{{option.name}}</li>
      </ul>
      <select v-model="selected" name="" id="">
        <option v-for="(option, index) in attr.options" :key="option.image" :value="option.name">{{option.name}}</option>
      </select>
    </div>
    <img class="imageSelect" :src="imageSelected">
  </div>
</template>

<script>
export default {
  name: 'passauSelect',
  props: {
    attr: Object
  },
  data () {
    return {
      selected: false,
      selectClick: false
    }
  },
  computed: {
    imageSelected () {
      if (typeof this.selected !== "number") { return false }

      return this.attr.options[this.selected].image
    },
    liSelected () {
      if (typeof this.selected !== "number") { return '' }

      return this.attr.options[this.selected].name
    }
  }
}
</script>

<style lang="scss" scoped>
*{
  box-sizing:border-box;
}
.select{
  display: block;
  position: relative;
  z-index: 2;

  .fauxselect{
    background: #fff;
    padding: 20px 20px 20px 42px;

    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-between;
    border-radius: 60px;
    z-index: 20;
    position: relative;
    .thecolor{
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      justify-content: space-between;

      .colorName{
        font-size: 14px;
        font-weight: bold;
        color: #272727;
        text-transform: capitalize;
        margin-right: 20px;

      }

      .colorSpot{
        width: 34px;
        height: 34px;
        border-radius: 100%;
        display: block;
      }
    }

    h4{
      font-family: Barlow;
      font-size: 26px;
      font-weight: 500;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: normal;
      text-transform: capitalize;
      color: #272727;
      margin: 0;
    }
  }
  select{
    display: none;
  }

  ul{
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
    li{
      padding: 15px 20px 15px 42px;

      &.active{
        background: rgba(235, 235, 235, 0.322);
      }
      &:hover{
        background: rgb(241, 241, 241);
      }
    }
  }

  &.selected{
    z-index: 300;
  }

}
</style>
