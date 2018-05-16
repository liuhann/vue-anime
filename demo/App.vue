<style lang="less">
    body {
        background-color: #111116;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .demo {
        position: relative;
        z-index: 1;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        width: 100%;
        min-height: 200px;
        border-bottom: 1px solid #000;
        cursor: pointer;
        .demo-title {
            position: absolute;
            top: 0;
            left: 20px;
            width: calc(100% - 40px);
            padding: 23px 0;
            font-size: 12px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #FFF;
            opacity: .7;
        }
    }
    .shadow {
        position: absolute;
        opacity: .2;
    }
    .square, .circle {
        pointer-events: none;
        position: relative;
        width: 28px;
        height: 28px;
        margin: 1px;
        background-color: #fef;
        font-size: 12px;
    }
</style>
<template>
  <div id="app">
    <div class="demo" @click="replay('demo1')">
        <h3 class="demo-title">TRANSLATE X</h3>
        <vue-anime ref="demo1" :animate-properties="{
	        translateX: 200
        }" class="circle" :autoplay="false"></vue-anime>
    </div>

    <div class="demo" @click="replay('demo2')">
      <h3 class="demo-title">TRANSLATE X</h3>
      <vue-anime-group ref="demo2" :autoplay="false" :animate-properties="{
    	translateX: 200
      }">
          <vue-anime class="circle"></vue-anime>
      </vue-anime-group>
    </div>
  </div>
</template>

<script>
import VueAnime from '../src/vue-anime'
import VueAnimeGroup from '../src/vue-anime-group'

export default {
  name: 'app',
  components: {
    VueAnime,
    VueAnimeGroup
  },

  methods: {
  	replay(demo) {
  		this.$refs[demo].restart();
    }
  }
}
</script>

