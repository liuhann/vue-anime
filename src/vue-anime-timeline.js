import anime from "animejs";

export default {
	name: 'vue-anime-timeline',
	props: {
		direction: {
			type: String,
			default: 'normal'
		},
		loop: {
			type: Boolean,
			default: false
		},
		autoplay: {
			type: Boolean,
			default: true
		},
	},

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

	methods: {
		initAnimeTimeLine() {
			this.animeInstance = anime.timeline({
				direction: this.direction,
				loop: this.loop,
				autoplay: this.autoplay
			});
			for (let i=0; i<this.animes.length; i++) {
				this.animeInstance.add(this.animes[i].getAnimeConfig());
			}
		},

		getTargets () {
			const targets = []
			for (let anime of this.animes) {
				targets.push(anime.$el)
			}
			return targets
		},

		addAnime(anime) {
			this.animes.push(anime)
		}
	}
}