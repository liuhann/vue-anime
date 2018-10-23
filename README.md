# vue-anime
Vue animation with timeline and grouping support using http://animejs.com/


## Usage

```sh
npm install vue-anime
```

In vue file, first import
```javascript
import {VueAnime} from 'vue-anime'
import {VueAnimeGroup} from 'vue-anime'
import {VueAnimeTimeLine} from 'vue-anime'
export default {
  name: 'app',
  components: {
    VueAnime,
    VueAnimeGroup,
    VueAnimeTimeLine
  },
}
</script>
```

and then use in template

```vue
<vue-anime ref="demo1" :animate="{
    translateX: 200
}" class="circle" :playing="false"></vue-anime>
```

Vue-anime support all feature provided by animejs.

There are three element available for use:
 1. vue-anime:  a single animation element
 2. vue-anime-group:  a group of elements that share the same animation properties
 3. vue-anime-timeline: multiple elements that run animation by orders

## Props

### animate
Type: `Object`

The animation `to` transitions or css properties with numeric values

CSS:	`opacity`, `backgroundColor`, `fontSize` ...
Transforms: `translateX`, `rotate`, `scale ` ...

**Initial css properties should be written as inline-css **

```vue
<vue-anime :style="{transform: translateX(-100)}" :animate="{translateX: 0}" class="circle"></vue-anime>
```

### duration

Type: `Number` or `Function`

### delay

Type: `Number` or `Function`

### easing
Type: `Number` or `Array`

| Types   | Examples             | Infos                                              |
| ------- | -------------------- | -------------------------------------------------- |
| String  | `'easeOutExpo'`      | Built in function names                            |
| `Array` | [.91,-0.54,.29,1.56] | Custom Bézier curve coordinates ([x1, y1, x2, y2]) |

| easeIn        | easeOut        | easeInOut        |
| ------------- | -------------- | ---------------- |
| easeInQuad    | easeOutQuad    | easeInOutQuad    |
| easeInCubic   | easeOutCubic   | easeInOutCubic   |
| easeInQuart   | easeOutQuart   | easeInOutQuart   |
| easeInQuint   | easeOutQuint   | easeInOutQuint   |
| easeInSine    | easeOutSine    | easeInOutSine    |
| easeInExpo    | easeOutExpo    | easeInOutExpo    |
| easeInCirc    | easeOutCirc    | easeInOutCirc    |
| easeInBack    | easeOutBack    | easeInOutBack    |
| easeInElastic | easeOutElastic | easeInOutElastic |


### elasticity

Elasticity of Elastic easings can be configured with the elasticity parameters

### direction
Type:  `String`
One of  'normal', 'reverse', 'alternate'

### loop

Type:  `Boolean`
Default:  false

### autoplay

Type:  `Boolean`
Default: false

### seek
Type:  `Number`
Animations or timelines current time.

### object  object-props
Type： `Object`

set animation target to object and specify property to change by object-props

```html
<vue-anime ref="demo4"
	:object="objectAnimeData"
     easing="linear"
     :playing="false"
     :object-props="{
      	prop1: 50,
  			prop2: '100%',
  			round: 1
  	}">
     {{objectAnimeData.prop1}} / {{objectAnimeData.prop2}}
</vue-anime>
```

### offset (timeline only)

Defines starting time relative to the previous animations duration.
```html
 <vue-anime-time-line ref="demo11">`
   <vue-anime v-for="index in [1,2,3]" :key="index" class="square" offset="+=600" :animate="{translateX:250}"></vue-anime>
</vue-anime-time-line>
```




## Example

### Group

Adding vue-anime to one group and share the same animation
```vue
  <vue-anime-group ref="demo2" :playing="false" :animate="{
      translateX: 200
  }">
      <vue-anime class="circle"></vue-anime>
      <vue-anime class="circle"></vue-anime>
      <vue-anime class="square"></vue-anime>
  </vue-anime-group>
```

### Css Animation
Animate any css properties (not only translate)
```vue
  <vue-anime ref="demo3" :animate="{
        opacity: .5,
        left: '240px',
        backgroundColor: '#FFF',
        borderRadius: ['0em', '2em'],
  }" easing="easeInOutQuad" class="square" :playing="false"></vue-anime>
```

### Object Animation

Set object and property
```vue
  <vue-anime ref="demo4" :object="objectAnimeData" easing="linear" :playing="false" :object-props="{
    prop1: 50,
        prop2: '100%',
        round: 1
    }">
      {{objectAnimeData.prop1}} / {{objectAnimeData.prop2}}
  </vue-anime>
```

### SVG Animation

Animate svg points

```vue
  <vue-anime ref="demo5" tag="polygon" easing="easeInOutExpo" :playing="false"
    points="64 69.32121174760113 8.574 99.95409624342311 62.81629226727815 67.27053849133411 64 3.9540962434231046 65.18370773272186 67.27053849133411 119.426 99.95409624342311 "
    fill="currentColor" :animate="{
      points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96',
  }">
  </vue-anime>
```

### Specific property parameters

```vue
<vue-anime class="square" :animate="{
	translateX: {
		value: 250,
		duration: 800
	},
	rotate: {
		value: 360,
		duration: 1800,
		easing: 'easeInOutSine'
	},
	scale: {
		value: 2,
		duration: 1600,
		delay: 800,
		easing: 'easeInOutQuart'
	},
	delay: 250
}">
</vue-anime>
```

### DURATION FUNCTION

```vue
<vue-anime-group ref="demo7" :playing="false" direction="alternate" :loop="true" :animate="{
        translateX: 250,
      }" :duration="(el, i, l) => {
        return 1000 + (i * 1000)
      }">
      <vue-anime v-for="index in [1,2,3]" :key="index" class="square"></vue-anime>
</vue-anime-group>
```

### key frames

```vue
<vue-anime ref="demo9" class="square" :playing="false" direction="alternate" :loop="true" :animate="{
        translateX: [
          { value: 250, duration: 1000, delay: 500, elasticity: 0 },
          { value: 0, duration: 1000, delay: 500, elasticity: 0 }
        ],
        translateY: [
          { value: -40, duration: 500, elasticity: 100 },
          { value: 40, duration: 500, delay: 1000, elasticity: 100 },
          { value: 0, duration: 500, delay: 1000, elasticity: 100 }
        ],
        scaleX: [
          { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
          { value: 1, duration: 900, elasticity: 300 },
          { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
          { value: 1, duration: 900, elasticity: 300 }
        ],
        scaleY: [
          { value: [1.75, 1], duration: 500 },
          { value: 2, duration: 50, delay: 1000, easing: 'easeOutExpo' },
          { value: 1, duration: 450 },
          { value: 1.75, duration: 50, delay: 1000, easing: 'easeOutExpo' },
          { value: 1, duration: 450 }
        ],
      }">
    </vue-anime>
```

### timeline basic

```vue
<vue-anime-time-line ref="demo10" :playing="false">
      <vue-anime v-for="index in [1,2,3]" :key="index" class="square" :animate="{translateX:250}"></vue-anime>
    </vue-anime-time-line>
```



### TIMELINE with offsets

```vue
<vue-anime-time-line ref="demo11" @complete="demo11Complete">
        <vue-anime v-for="index in [1,2,3]" :key="index" class="square" offset="+=600" :animate="{translateX:250}"></vue-anime>
      </vue-anime-time-line>
```



### Time-line property Inheritance

```vue
<vue-anime-time-line ref="demo12" :duration="500" easing="easeOutExpo" :loop="true" :delay="(el, i)=>i * 200" :timelines="[
        {
        translateX: 250,
      }, {
        opacity: .5,
        translateX: 250,
        scale: 2,
      }, {
        translateX: 0,
        scale: 1
      }
      ]">
        <vue-anime class="square"></vue-anime>
        <vue-anime class="circle"></vue-anime>
        <vue-anime class="triangle"></vue-anime>
      </vue-anime-time-line>
```


### Animate process control

```vue
<vue-anime-group ref="demo13" :duration="500" :seek="seek" :delay="(el, i)=>i * 200" :playing="false" :animate="{
        translateX: 200
      }">
<vue-anime class="square"></vue-anime>
<vue-anime class="circle"></vue-anime>
<vue-anime class="triangle"></vue-anime>
</vue-anime-group>
<input class="progress" step=".001" type="range" min="0" max="100" @input="seekChange" value="0">
```
