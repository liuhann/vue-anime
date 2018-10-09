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
        min-height: 250px;
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
    .controls {
      position: absolute;
      bottom: 10px;
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
        background-color: #ffa113;
        font-size: 12px;
    }

  .triangle {
    pointer-events: none;
    position: relative;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 14px 24px 14px;
    border-color: transparent transparent #ffa113 transparent;
  }

  .circle {
      border-radius: 28px;
  }
  .progress {
    position: absolute;
    bottom: 30px;
  }

  svg#Capa_1 {
    width: 120px;
    height: 120px;
  }

  .text-group {
    .anime {
      display: inline-block;
      min-width: 30px;
      font-size: 16px;
      color: #fff;
    }
  }
</style>

<template>
  <div id="app">
    <div class="demo" @click="replay('demo1')">
        <h3 class="demo-title">1 TRANSLATE X</h3>
        <vue-anime ref="demo1"
         :animate="animation.translateX" class="circle" :playing="false"></vue-anime>
    </div>

    <div class="demo" @click="replay('demo1_1')">
      <h3 class="demo-title">1-1 TRANSLATE X by input</h3>
      <vue-anime ref="demo1_1" :animate="changingAnimate" class="circle" easing="linear"></vue-anime>
      <input style="margin-top: 50px" step="20" v-model.number="translateX" type="number">
    </div>

    <div class="demo" @click="replay('demo2')">
      <h3 class="demo-title">2 ANIME GROUP</h3>
      <vue-anime-group ref="demo2" :playing="false" :animate="animation.translateX">
          <vue-anime class="square"></vue-anime>
          <vue-anime class="circle"></vue-anime>
          <vue-anime class="triangle"></vue-anime>
      </vue-anime-group>
    </div>

    <div class="demo" @click="replay('demo3')">
      <h3 class="demo-title">3 CSS ANIMATION</h3>
      <vue-anime ref="demo3" :animate="animation.css" easing="easeInOutQuad" class="square" :playing="false"></vue-anime>
    </div>

    <div class="demo" @click="replay('demo4')">
      <h3 class="demo-title">4 Object Animation</h3>
      <vue-anime ref="demo4" :object="objectAnimeData" easing="linear" :playing="false" :object-props="{
        prop1: 50,
        prop2: '100%',
        round: 1
      }">
          {{objectAnimeData.prop1}} / {{objectAnimeData.prop2}}
      </vue-anime>
    </div>

  <div class="demo" @click="replay('demo5')">
    <h3 class="demo-title">5 SVG ANIMATION</h3>
    <svg width="128" height="128" viewBox="0 0 128 128">
      <vue-anime ref="demo5" tag="polygon" easing="easeInOutExpo" :playing="false"
        points="64 69.32121174760113 8.574 99.95409624342311 62.81629226727815 67.27053849133411 64 3.9540962434231046 65.18370773272186 67.27053849133411 119.426 99.95409624342311 "
                 fill="currentColor" :animate="animation.svgtarget">
      </vue-anime>
    </svg>
  </div>

  <div class="demo" @click="replay('demo6')">
    <h3 class="demo-title">6 SPECIFIC PROPERTY PARAMETERS</h3>
      <vue-anime ref="demo6" class="square" :playing="false" :animate="animation.specify">
      </vue-anime>
  </div>

  <div class="demo" @click="replay('demo7')">
    <h3 class="demo-title">7.DURATION FUNCTION</h3>
    <vue-anime-group ref="demo7" :playing="false" direction="alternate" :loop="true" :animate="{
        translateX: 250,
      }" :duration="(el, i, l) => {
        return 1000 + (i * 1000)
      }">
      <vue-anime v-for="index in [1,2,3]" :key="index" class="square"></vue-anime>
    </vue-anime-group>
  </div>

  <div class="demo" @click="replay('demo8')">
    <h3 class="demo-title">8 DURATION FUNCTION</h3>
    <vue-anime-group ref="demo8" :playing="false" direction="alternate" :loop="true" :animate="{
        translateX: (el, i, l) => (l-i) * 100,
        translateY: (el, i) => 50 + (-50 * i),
        scale: (el, i, l) => (l - i) + .25,
        rotate: (el, i, l) => this.random(-360, 360)
      }" :duration="(el, i, l) => {
        return this.random(1200, 1800);
      }" :delay="(el, i, l) => {
        return this.random(0, 1000);
      }">
      <vue-anime v-for="index in [1,2,3]" :key="index" class="square"></vue-anime>
    </vue-anime-group>
  </div>

  <div class="demo" @click="replay('demo9')">
    <h3 class="demo-title">9 KEYFRAMES</h3>
    <vue-anime ref="demo9" class="square" :playing="false" direction="alternate" :loop="true" :animate="{
        translateX: [
          { value: 250, duration: 1000, delay: 500, elasticity: 0 },
          { value: 0, duration: 1000, delay: 500, elasticity: 0 }
        ],
        translateY: [
          { value: -40, duration: 500, elasticity: 100 },
          { value: 40, duration: 500, delay: 1000, elasticity: 100 },
          { value: 0, duration: 500, delay: 1000, elasticity: 100 }
        ],
        scaleX: [
          { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
          { value: 1, duration: 900, elasticity: 300 },
          { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
          { value: 1, duration: 900, elasticity: 300 }
        ],
        scaleY: [
          { value: [1.75, 1], duration: 500 },
          { value: 2, duration: 50, delay: 1000, easing: 'easeOutExpo' },
          { value: 1, duration: 450 },
          { value: 1.75, duration: 50, delay: 1000, easing: 'easeOutExpo' },
          { value: 1, duration: 450 }
        ],
      }" @update="demo9update">
    </vue-anime>
  </div>

  <div class="demo" @click="replay('demo10')">
    <h3 class="demo-title">10 Basic timeline</h3>
    <vue-anime-time-line ref="demo10" :playing="false">
      <vue-anime v-for="index in [1,2,3]" :key="index" class="square" :animate="{translateX:250}"></vue-anime>
    </vue-anime-time-line>
  </div>

    <div class="demo" @click="replay('demo11')">
      <h3 class="demo-title">11 TIMELINE with offsets</h3>
      <vue-anime-time-line ref="demo11" @complete="demo11Complete">
        <vue-anime v-for="index in [1,2,3]" :key="index" class="square" offset="+=600" :animate="{translateX:250}"></vue-anime>
      </vue-anime-time-line>
    </div>

    <div class="demo" @click="replay('demo12')">
      <h3 class="demo-title">12 TIMELINE property Inheritance</h3>
      <vue-anime-time-line ref="demo12" :duration="500" easing="easeOutExpo" :loop="true" :delay="(el, i)=>i * 200" :timelines="[
        {
        translateX: 250,
      }, {
        opacity: .5,
        translateX: 250,
        scale: 2,
      }, {
        translateX: 0,
        scale: 1
      }
      ]">
        <vue-anime class="square"></vue-anime>
        <vue-anime class="circle"></vue-anime>
        <vue-anime class="triangle"></vue-anime>
      </vue-anime-time-line>
    </div>

    <div class="demo">
      <h3 class="demo-title">12 timeline control</h3>
      <vue-anime-group ref="demo12" :delay="(el, i)=>i * 200" @click="replay('demo12')" direction="alternate" :loop="true" :playing="playing1" :animate="{
          translateX: 250
      }">
        <vue-anime class="square"></vue-anime>
        <vue-anime class="circle"></vue-anime>
        <vue-anime class="triangle"></vue-anime>
      </vue-anime-group>
      <div class="controls">
        <button @click="playing1=false">pause</button> <button @click="playing1=true">play</button>
      </div>
    </div>

    <div class="demo">
      <h3 class="demo-title">13 Timeline seek</h3>
      <vue-anime-group ref="demo13" :duration="500" :seek="seek" :delay="(el, i)=>i * 200" :playing="false" :animate="{
        translateX: 200
      }">
        <vue-anime class="square"></vue-anime>
        <vue-anime class="circle"></vue-anime>
        <vue-anime class="triangle"></vue-anime>
      </vue-anime-group>
      <input class="progress" step=".001" type="range" min="0" max="100" @input="seekChange" value="0">
    </div>

    <div class="demo">
      <h3 class="demo-title">13 Timeline seek</h3>
      <vue-anime-group ref="demo13" :duration="500" :seek="seek" :delay="(el, i)=>i * 200" :playing="false" :animate="{
        translateX: 200
      }">
        <vue-anime class="square"></vue-anime>
        <vue-anime class="circle"></vue-anime>
        <vue-anime class="triangle"></vue-anime>
      </vue-anime-group>
      <input class="progress" step=".001" type="range" min="0" max="100" @input="seekChange" value="0">
    </div>

    <div class="demo">
      <h3 class="demo-title">14 windmill</h3>
      <vue-anime ref="demo14" :loop="true" :playing="true" easing="linear" :animate="{
        rotate: '0.5turn',
      }">
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
          <g>
            <title>Layer 1</title>
            <path id="svg_3" fill="#F985AC" d="m451.062,269.728l-70.422,70.422c-10.53,10.53 -24.812,16.446 -39.704,16.446l-82.936,0l0,-106.195l185.057,0c10.086,0 15.138,12.195 8.005,19.327z"/>
            <path id="svg_4" fill="#FBDD56" d="m238.673,443.463l-70.422,-70.422c-10.53,-10.53 -16.446,-24.812 -16.446,-39.704l0,-82.937l106.195,0l0,185.057c0,10.087 -12.195,15.139 -19.327,8.006z"/>
            <path id="svg_5" fill="#83CCEB" d="m64.938,231.074l70.422,-70.422c10.53,-10.53 24.812,-16.446 39.704,-16.446l82.936,0l0,106.195l-185.057,0c-10.086,0 -15.137,-12.195 -8.005,-19.327z"/>
            <path id="svg_6" fill="#FF6E6E" d="m277.327,57.339l70.422,70.422c10.53,10.53 16.446,24.812 16.446,39.704l0,82.936l-106.195,0l0,-185.057c0,-10.086 12.195,-15.137 19.327,-8.005z"/>
            <path id="svg_7" opacity="0.1" d="m258,250.401c37.634,-16.364 94.924,-61.15 106.195,-82.936l0,82.936l-106.195,0z"/>
            <path id="svg_8" opacity="0.1" d="m258,250.401c16.364,37.634 61.15,94.924 82.936,106.195l-82.936,0l0,-106.195z"/>
            <path id="svg_9" opacity="0.1" d="m258,250.401c-37.634,16.364 -94.924,61.15 -106.195,82.937l0,-82.937l106.195,0l0,0z"/>
            <path id="svg_10" opacity="0.1" d="m258,250.401c-16.364,-37.634 -61.15,-94.924 -82.937,-106.195l82.937,0l0,106.195z"/>
            <circle id="svg_11" fill="#FFFFFF" r="37.633999" cy="250.4" cx="258"/>
           </g>
        </svg>
      </vue-anime>
    </div>

    <div class="demo" @click="replay('demo15')">
      <h3 class="demo-title">15 Text type in</h3>
      <vue-anime-group class="text-group" ref="demo15" :playing="false" :delay="(el, i)=>i * 50" :from="{opacity: 0, translateY: -20}" :animate="{opacity: 1, translateY: 0}" >
        <vue-anime class="anime" v-for="(char, index) in characters" :key="index" v-html="char"></vue-anime>
      </vue-anime-group>
    </div>
  </div>
</template>

<script>
import VueAnime from '../src/vue-anime'
import VueAnimeGroup from '../src/vue-anime-group'
import VueAnimeTimeLine from '../src/vue-anime-timeline'

export default {
  name: 'app',
  components: {
    VueAnime,
    VueAnimeGroup,
    VueAnimeTimeLine
  },

  watch: {
    /* translateX () {
      this.$refs['demo1_1'].reset()
    } */
  },

  data () {
    return {
      animation: {
        translateX: {
          translateX: 140
        },
        css: {
          opacity: 0.5,
          left: '240px',
          backgroundColor: '#FFF',
          borderRadius: ['0em', '2em']
        },
        specify: {
          translateX: {
            value: 250,
            duration: 800
          },
          rotate: {
            value: 360,
            duration: 1800,
            easing: 'easeInOutSine'
          },
          scale: {
            value: 2,
            duration: 1600,
            delay: 800,
            easing: 'easeInOutQuart'
          },
          delay: 250
        },
        svgtarget: {
          points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96'
        }
      },
      translateX: 20,
      characters: 'I am a super HERO 我是个超级英雄',
      playing1: false,
      seek: 0,
      objectAnimeData: {
        prop1: 0,
        prop2: '50%'
      }
    }
  },

  computed: {
    changingAnimate () {
      return {
        translateX: this.translateX
      }
    }
  },

  methods: {
    replay (demo) {
      this.$refs[demo].restart()
    },
    random (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    seekChange (evt) {
      this.seek = 500 * evt.target.value / 100
    },

    demo9update () {

    },
    demo11Complete () {

    }
  }
}
</script>
