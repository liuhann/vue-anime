# vue-anime
Vue animation with timeline and grouping support using http://animejs.com/

## Usage

```sh
npm install vue-anime
```


In vue file, first import 
```javascript
import VueAnime from '../src/vue-anime'
export default {
  name: 'app',
  components: {
    VueAnime,
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


Vue-anime support all feature provided by animejs。 

## Example

### ANIME GROUP

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

### CSS ANIMATION
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

### SVG ANIMATION

Animate svg points

```vue
  <vue-anime ref="demo5" tag="polygon" easing="easeInOutExpo" :playing="false"
    points="64 69.32121174760113 8.574 99.95409624342311 62.81629226727815 67.27053849133411 64 3.9540962434231046 65.18370773272186 67.27053849133411 119.426 99.95409624342311 "
    fill="currentColor" :animate-properties="{
      points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96',
  }">
  </vue-anime>
```
