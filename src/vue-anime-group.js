import props from './anime-prop'

export default {
	name: 'vue-anime-group',
	props,

	data () {
		return {
			animes: []
		}
	},
	render (h) {
		const slots = this.$slots.default
		let children = slots
		return h(this.tag, this.$attrs, children);
	},

	mounted() {
		this.initAnime()
	},

	methods: {

		getTargets () {
			const targets = []
			for (let anime of this.animes) {

			}
		},

		addAnime(anime) {
			this.animes.push(anime)
		}
	}
}