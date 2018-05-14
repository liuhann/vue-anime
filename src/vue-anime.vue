<template>
  <div class="vue-anime">
      <slot></slot>
  </div>
</template>

<script>
  import anime from 'animejs'

  export default {
    name: "vue-anime",
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
      }
    },
    mounted: function() {

    }
  }
</script>

<style scoped>

</style>