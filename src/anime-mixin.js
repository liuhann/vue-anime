import props from './anime-prop'
import anime from 'animejs'
import { is } from './is'
const validTransforms = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skewX', 'skewY', 'perspective']

export default {
  props,

  data () {
    return {
    }
  },

  mounted () {
    if (is.fnc(this.$parent.addAnime)) {
      this.$parent.addAnime(this)
    } else {
      this.initAnime()
    }
  },

  watch: {
    'playing': function (value) {
      if (value) {
        this.play()
      } else {
        this.pause()
      }
    },
    'seek': function (value) {
      this.anime.seek(value)
    }
  },

  methods: {
    initAnime () {
      this.anime = anime(this.getAnimeConfig())
      if (this.playing === true) {
        this.play()
      }
      this.anime.update = (anim) => {
        this.$emit('update', anim)
      }
      this.anime.begin = (anim) => {
        this.$emit('begin', anim)
      }
      this.anime.complete = (anim) => {
        this.$emit('complete', anim)
      }
    },

    reset () {
      // pause to remove from anime loop list
      this.anime.pause()
      this.initAnime()
    },

    getAnimeConfig (inherit) {
      const animeConfig = {}
      if (inherit) {
        Object.assign(animeConfig, inherit)
      }
      // prepare animejs options
      Object.assign(animeConfig, this.animate, {
        duration: this.duration,
        delay: this.delay,
        easing: this.easing,
        elasticity: this.elasticity,
        autoplay: false,
        direction: this.direction,
        loop: this.loop
      })
      if (this.offset || this.offset === 0) {
        animeConfig.offset = this.offset
      }
      // object numeric value animates
      if (this.object) {
        Object.assign(animeConfig, this.objectProps)
      }
      animeConfig.targets = this.getTargets()
      this.setFromProperties(animeConfig)
      console.log('init with', animeConfig)
      return animeConfig
    },

    pause () {
      this.anime.pause()
    },

    play () {
      this.anime.play()
    },
    restart () {
      this.anime.restart()
    },
    setFromProperties (animeConfig) {
      const transforms = []
      for (let key in this.from) {
        if (validTransforms.includes(key)) {
          const transformValue = is.str(this.from[key]) ? this.from[key] : `${this.from[key]}${this.getTransformUnit(key)}`
          transforms.push(`${key}(${transformValue})`)
        } else {
          if (is.arr(animeConfig.targets)) {
            animeConfig.targets.forEach(el => {
              el.style[key] = this.from[key]
            })
          } else {
            animeConfig.targets.style[key] = this.from[key]
          }
        }
      }
      if (transforms.length) {
        const transfromStr = transforms.join(' ')
        if (is.arr(animeConfig.targets)) {
          animeConfig.targets.forEach(el => {
            el.style.transform = transfromStr
          })
        } else {
          animeConfig.targets.style.transform = transfromStr
        }
      }
    },

    // copy from animejs
    getTransformUnit (propName) {
      if (propName.indexOf('translate') > -1 || propName.indexOf('perspective') > -1) return 'px'
      if (propName.indexOf('rotate') > -1 || propName.indexOf('skew') > -1) return 'deg'
    },

    getTargets () {
      return this.object || this.$el
    }
  }
}
