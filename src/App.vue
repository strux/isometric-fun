<template>
    <div id="app">
        <button v-on:click="perspective = !perspective">Toggle perspective</button>
        <input type="range" min="0" max="11" value="0" v-model="time">
        <div :style="wrapperStyle">
            <div class="row" v-for="(val, rowIndex) in tileData.height" :key="rowIndex">
                <tile v-for="(val, columnIndex) in tileData.width" :x="columnIndex" :y="rowIndex" :time="time" :tileData="tileData.tiles[tileIndex(columnIndex, rowIndex)]" :mapColumns="tileData.width" :mapRows="tileData.height" :key="columnIndex + ',' + rowIndex"></tile>
            </div>
        </div>
    </div>
</template>

<script>
import Tile from './components/Tile.vue'
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
        tileIndex(x, y) {
            return (y * tileData.width) + x
        },
    },
    components: {
       Tile,
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
