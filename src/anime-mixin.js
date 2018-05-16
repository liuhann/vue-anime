import props from './anime-prop'
import anime from "animejs";

export default {
	props,

	data () {
		return {
			anime: null
		}
	},

	methods: {
		initAnime() {
			const animeConfig = {};
			Object.assign(animeConfig, this.animateProperties, {
				duration: this.duration,
				delay: this.delay,
				easing: this.easing,
				elasticity: this.elasticity,
				autoplay: this.autoplay
			})
			if (this.object) {
				debugger;
				Object.assign(animeConfig, this.objectProps)
			}
			animeConfig.targets = this.getTargets()
			this.anime = new anime(animeConfig)
		},

		play() {
			this.anime.play()
		},
		restart() {
			this.anime.restart()
		},

		getTargets() {
			return this.object || this.$el
		}
	}
}