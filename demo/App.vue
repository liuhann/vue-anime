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
    .circle {
        border-radius: 28px;
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
      <h3 class="demo-title">ANIME GROUP</h3>
      <vue-anime-group ref="demo2" :autoplay="false" :animate-properties="{
    		translateX: 200
      }">
          <vue-anime class="circle"></vue-anime>
          <vue-anime class="circle"></vue-anime>
          <vue-anime class="square"></vue-anime>
      </vue-anime-group>
    </div>

    <div class="demo" @click="replay('demo3')">
      <h3 class="demo-title">CSS ANIMATION</h3>
      <vue-anime ref="demo3" :animate-properties="{
        opacity: .5,
        left: '240px',
        backgroundColor: '#FFF',
        borderRadius: ['0em', '2em'],
      }" easing="easeInOutQuad" class="square" :autoplay="false"></vue-anime>
    </div>

    <div class="demo" @click="replay('demo4')">
      <h3 class="demo-title">Object Animation</h3>
      <vue-anime ref="demo4" :object="objectAnimeData" easing="linear" :autoplay="false" :object-props="{
      	prop1: 50,
  			prop2: '100%',
  			round: 1
  		}">
          {{objectAnimeData.prop1}} / {{objectAnimeData.prop2}}
      </vue-anime>
    </div>

		<div class="demo" @click="replay('demo5')">
			<h3 class="demo-title">SVG ANIMATION</h3>
			<svg width="128" height="128" viewBox="0 0 128 128">
				<vue-anime ref="demo5" tag="polygon" easing="easeInOutExpo" :autoplay="false"
					points="64 69.32121174760113 8.574 99.95409624342311 62.81629226727815 67.27053849133411 64 3.9540962434231046 65.18370773272186 67.27053849133411 119.426 99.95409624342311 "
									 fill="currentColor" :animate-properties="{
         							points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96',
      						}">
				</vue-anime>
			</svg>
		</div>

		<div class="demo" @click="replay('demo6')">
			<h3 class="demo-title">SVG ANIMATION</h3>
				<vue-anime ref="demo6" class="square" :autoplay="false"
									 :animate-properties="{
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
      						 }">
				</vue-anime>
		</div>

		<div class="demo" @click="replay('demo7')">
			<h3 class="demo-title">DURATION FUNCTION</h3>
			<vue-anime-group ref="demo7" :autoplay="false" direction="alternate" :loop="true" :animate-properties="{
					translateX: 250,
				}" :duration="(el, i, l) => {
					return 1000 + (i * 1000)
				}">
				<vue-anime v-for="index in [1,2,3]" :key="index" class="square"></vue-anime>
			</vue-anime-group>
		</div>

		<div class="demo" @click="replay('demo8')">
			<h3 class="demo-title">DURATION FUNCTION</h3>
			<vue-anime-group ref="demo8" :autoplay="false" direction="alternate" :loop="true" :animate-properties="{
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
			<h3 class="demo-title">KEYFRAMES</h3>
			<vue-anime ref="demo9" class="square" :autoplay="false" direction="alternate" :loop="true" :animate-properties="{
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
				}">
			</vue-anime>
		</div>

		<div class="demo" @click="replay('demo10')">
			<h3 class="demo-title">BASIC TIMELINE</h3>
			<vue-anime-time-line ref="demo10">
				<vue-anime v-for="index in [1,2,3]" :key="index" class="square" :animate-properties="{translateX:250}"></vue-anime>
			</vue-anime-time-line>
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

  data() {
    return {
    	objectAnimeData: {
    		prop1: 0,
				prop2: '50%'
			}
    }
  },

  methods: {
  	replay(demo) {
  		this.$refs[demo].restart();
    },
  	random(min, max) {
  		return Math.floor(Math.random() * (max - min + 1)) + min;
		}
  }
}
</script>

