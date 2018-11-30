<template>
    <div id="app">
        <button v-on:click="perspective = !perspective">Toggle perspective</button>
        <input type="range" min="0" max="11" value="0" v-model="time">
        <tile-renderer :style="wrapperStyle" :tile-data="tileData" :time="time"></tile-renderer>
    </div>
</template>

<script>
import TileRenderer from './components/TileRenderer.vue'
import tileData from './data/tileMap.js'

export default {
    name: 'app',
    data: function() {
        return {
            tileData: tileData,
            perspective: true,
            time: 0,
        }
    },
    computed: {
        wrapperStyle() {
            let style = {
                position: 'relative',
            }
            if (this.perspective) {
                style = {
                    ...style,
                    transform: 'scale(1,0.5) rotate(45deg) translate(50%)',
                }
            }
            return style
        },
    },
    methods: {
    },
    components: {
       TileRenderer,
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
