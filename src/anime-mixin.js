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

	watch: {
		'playing': function(value) {
			debugger;
			if (value) {
				this.play()
			} else {
				this.pause()
			}
		}
	},

	methods: {
		initAnime() {
			this.anime = new anime(this.getAnimeConfig())
			if (this.autoplay || this.playing === true) {
				this.play()
			}
		},

		getAnimeConfig(inherit) {
			const animeConfig = {}
			if (inherit) {
				Object.assign(animeConfig, inherit);
			}
			Object.assign(animeConfig, this.animate, {
				duration: this.duration,
				delay: this.delay,
				easing: this.easing,
				elasticity: this.elasticity,
				autoplay: this.autoplay,
				direction: this.direction,
				loop: this.loop
			})
			if (this.offset || this.offset === 0) {
				animeConfig.offset = this.offset
			}
			if (this.object) {
				Object.assign(animeConfig, this.objectProps)
			}
			animeConfig.targets = this.getTargets()
			return animeConfig;
		},

		pause() {
			this.anime.pause()
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