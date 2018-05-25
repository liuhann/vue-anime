export default {
	duration: {
		type: [Number, Function],
		default: function() {
			return 1000
		}
	},
	delay: {
		type: [Number, Function],
		default: 0
	},
	offset: {
		type: [Number, String]
	},
	easing: {
		type: [String, Array],
		default: 'easeOutElastic'
	},
	elasticity: {
		type: [Number, Function],
		default: 500
	},
	direction: {
		type: String,
		default: 'normal'
	},
	loop: {
		type: Boolean,
		default: false
	},
	animate: {
		type: Object,
		default: function() {
			return {}
		}
	},
	autoplay: {
		type: Boolean,
		default: true
	},
	object: {
		type: Object
	},
	objectProps: {
		type: Object
	},
	tag: {
		type: String,
		default: 'div'
	},
	playing: {
		type: Boolean,
	}
}