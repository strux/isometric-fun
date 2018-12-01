<template>
  <div id="app">
    <button v-on:click="onToggleEdit">Toggle edit mode</button>
    <tile-renderer :style="wrapperStyle" :player-position="playerPosition" :tile-data="tileData" :time="time" :editing="editing"></tile-renderer>
    <edit-tools
      :tile-data="tileData"
      :time="time"
      v-if="editing"
      v-on:toggle-perspective="perspective = !perspective"
      v-on:set-time="time = $event"
      v-on:set-water-level="tileData.waterLevel = $event"
    ></edit-tools>
  </div>
</template>

<script>
import EditTools from './components/EditTools.vue'
import TileRenderer from './components/TileRenderer.vue'
import tileData from './data/tileMap.js'

export default {
  name: 'app',
  data: function() {
    return {
      tileData: tileData,
      perspective: false,
      editing: true,
      time: 0,
      playerPosition: [0,0],
      savedPlayerPosition: [0,0],
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
          transform: 'scale(1, 0.5) translate(25%, 0%) rotate(45deg)',
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
      if (!this.editing) {
        let code = e.keyCode.toString()
        if (Object.keys(this.moveKeys()).includes(code)) {
          this.movePlayer(this.moveKeys()[code])
          e.preventDefault()
        }
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
    onToggleEdit() {
      if (this.editing) {
        this.perspective = true
        this.playerPosition = this.savedPlayerPosition.slice() // clone array
      } else {
        this.perspective = false
        this.savedPlayerPosition = this.playerPosition.slice() // clone array
        this.playerPosition = [0,0]
      }
      this.editing = !this.editing
    }
  },
  components: {
    EditTools,
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
