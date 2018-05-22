import props from './anime-prop'
import anime from "animejs";
import {is} from "./is";

export default {
	props,

	data () {
		return {
			anime: null
		}
	},

	mounted() {
		if (is.fnc(this.$parent.addAnime)) {
			this.$parent.addAnime(this)
		} else {
			this.initAnime()
		}
	},

	methods: {
		initAnime() {
			this.anime = new anime(this.getAnimeConfig())
		},

		getAnimeConfig() {
			const animeConfig = {};
			Object.assign(animeConfig, this.animateProperties, {
				duration: this.duration,
				delay: this.delay,
				easing: this.easing,
				elasticity: this.elasticity,
				autoplay: this.autoplay,
				direction: this.direction,
				loop: this.loop
			})
			if (this.object) {
				Object.assign(animeConfig, this.objectProps)
			}
			animeConfig.targets = this.getTargets()
			return animeConfig;
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