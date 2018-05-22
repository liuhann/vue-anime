import animeMixin from './anime-mixin'
import {is} from './is'

export default {
	name: 'vue-anime',
	mixins: [animeMixin],

	data() {
		return {
		}
	},

	render (h) {
		const slots = this.$slots.default
		let children = slots
		const { footer } = this.$slots
		if (footer) {
			children = slots ? [...slots, ...footer] : [...footer]
		}
		return h(this.tag, this.$attrs, children)
	},

	mounted() {
		if (is.fnc(this.$parent.addAnime)) {
			this.$parent.addAnime(this)
		} else {
			this.initAnime()
		}
	},

	methods: {

	}
}