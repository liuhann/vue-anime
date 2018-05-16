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
<vue-anime ref="demo1" :animate-properties="{
    translateX: 200
}" class="circle" :autoplay="false"></vue-anime>
```
