<template>
  <div id="app">
    <button v-on:click="perspective = !perspective">Toggle perspective</button>
    <input type="range" min="0" max="11" value="0" v-model="time">
    <tile-renderer :style="wrapperStyle" :player-position="playerPosition" :tile-data="tileData" :time="time"></tile-renderer>
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
      playerPosition: [0,0],
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
    moveKeys () {
      return { 37: 'left', 38: 'up', 39: 'right', 40: 'down' }
    },
    handleKeys(e) {
      let code = e.keyCode.toString()
      if (Object.keys(this.moveKeys()).includes(code)) {
        this.movePlayer(this.moveKeys()[code])
        e.preventDefault()
      }
    },
    movePlayer(direction) {
      switch (direction) {
        case 'up':
          this.playerPosition.splice(1, 1, this.playerPosition[1] - 1)
          break
        case 'down':
          this.playerPosition.splice(1, 1, this.playerPosition[1] + 1)
          break
        case 'left':
          this.playerPosition.splice(0, 1, this.playerPosition[0] - 1)
          break
        case 'right':
          this.playerPosition.splice(0, 1, this.playerPosition[0] + 1)
          break
      }
    },
  },
  components: {
    TileRenderer,
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeys)
  },
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
