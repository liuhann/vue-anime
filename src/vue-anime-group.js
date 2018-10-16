import animeMixin from './anime-mixin'

export default {
  name: 'vue-anime-group',
  mixins: [animeMixin],

  data () {
    return {
      animes: []
    }
  },
  render (h) {
    const slots = this.$slots.default
    let children = slots
    return h(this.tag, Object.assign({
      class: '_vue-anime-group',
      on: this.$listeners
    }, this.$attrs), children)
  },

  methods: {
    getTargets () {
      const targets = []
      for (let anime of this.animes) {
        targets.push(anime.$el)
      }
      return targets
    },

    addAnime (anime) {
      this.animes.push(anime)
    }
  }
}
