import anime from "animejs";
import props from './anime-prop';

export default {
	name: 'vue-anime-timeline',
	props: Object.assign(props, {
		timelines: {
			type: Array,
		},
	}),

	data () {
		return {
			animeInstance: null,
			animes: []
		}
	},

	render (h) {
		const slots = this.$slots.default
		let children = slots
		return h(this.tag, this.$attrs, children);
	},

	mounted() {
		this.initAnimeTimeLine()
	},

	watch: {
		'playing': function(value) {
			if (value) {
				this.play()
			} else {
				this.pause()
			}
		}
	},

	methods: {
		initAnimeTimeLine() {
			this.animeInstance = anime.timeline({
				direction: this.direction,
				loop: this.loop,
				delay: this.delay,  // adding delay for the case of group time line
				autoplay: false
			})

			if (this.timelines) {
				// time frame for one or group
				for (let timeline of this.timelines) {
					timeline.targets = this.getTargets()
					this.animeInstance.add(timeline)
				}
			} else {
				// add each time line with different target
				for (let i=0; i<this.animes.length; i++) {
					this.animeInstance.add(this.animes[i].getAnimeConfig(this.$props))
				}
			}

			if (this.playing) {
				this.animeInstance.play()
			}
		},

		getTargets () {
			const targets = []
			for (let anime of this.animes) {
				targets.push(anime.$el)
			}
			return targets
		},

		play() {
			this.animeInstance.play()
		},
		pause() {
			this.animeInstance.pause()
		},
		restart() {
			this.animeInstance.restart()
		},

		addAnime(anime) {
			this.animes.push(anime)
		}
	}
}