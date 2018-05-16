import anime from 'animejs'

export default {
	name: 'vue-anime',
	props: {
		duration: {
			type: Number || Function,
			default: 1000
		},
		delay: {
			type: Number || Function,
			default: 0
		},
		easing: {
			type: String || Array,
			default: 'easeOutElastic'
		},
		elasticity: {
			type:Number || Function,
			default: 500
		},
		animateProperties: {
			type: Object,
			default: {}
		},
		autoplay: {
			type: Boolean,
			default: true
		},
		tag: {
			type: String,
			default: 'div'
		}
	},

	data() {
		return {
			anime: null
		}
	},

	render (h) {
		const slots = this.$slots.default
		let children = slots
		const { footer } = this.$slots
		if (footer) {
			children = slots ? [...slots, ...footer] : [...footer]
		}
		return h(this.tag, this.$attrs, children);
	},

	mounted() {
		const animeConfig = {};
		Object.assign(animeConfig, this.animateProperties, {
			duration: this.duration,
			delay: this.delay,
			easing: this.easing,
			elasticity: this.elasticity,
			autoplay: this.autoplay
		})
		animeConfig.targets = this.$el;
		this.anime = new anime(animeConfig);
	},

	methods: {
		play() {
			this.anime.play()
		},
		restart() {
			this.anime.restart()
		}
	}

}