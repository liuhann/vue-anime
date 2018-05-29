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
			if (value) {
				this.play()
			} else {
				this.pause()
			}
		},
		'seek': function(value) {
			this.anime.seek(value)
		}
	},

	methods: {
		initAnime() {
			this.anime = new anime(this.getAnimeConfig())
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
				autoplay: false,
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