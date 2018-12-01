<template>
  <div :style="style">
    <button v-on:click="$emit('toggle-perspective')">Toggle perspective</button>
    <label for="time">Time</label>
    <input id="time" type="range" min="0" max="11" v-bind:value="time" v-on:change="$emit('set-time', $event.target.value)">
    <label for="waterLevel">Water Level</label>
    <input id="waterLevel" type="range" min="0" max="9" v-bind:value="tileData.waterLevel" v-on:change="$emit('set-water-level', $event.target.value)">
    <label for="rows">Map Rows</label>
    <input id="rows" type="range" min="1" max="100" v-bind:value="tileData.height" v-on:change="updateRows">
  </div>
</template>

<script>
import { tileDict } from '../data/tileMap.js'

export default {
  name: 'EditTools',
  props: ['tileData', 'time'],
  data: function() {
    return {
      localTileData: this.tileData,
    }
  },
  computed: {
    style() {
      return {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '200px',
        backgroundColor: 'hsla(0, 0%, 0%, 0.2)',
        padding: '10px',
      }
    },
  },
  methods: {
    updateRows(event) {
      let totalRows = parseInt(event.target.value)
      let rowCount = totalRows - this.tileData.height
      let tileCount = rowCount * this.tileData.width
      this.localTileData.height = totalRows
      if(rowCount > 0) {
        let newTiles = Array(tileCount).fill({ ...tileDict['d'], elevation: this.tileData.waterLevel })
        this.localTileData.tiles.push(...newTiles)
      } else {
        this.localTileData.tiles.splice(tileCount, -tileCount)
      }
      this.$emit('set-tile-data', this.localTileData)
    }
  },
}
</script>

<style scoped>
  label, input {
    display: block;
  }
</style>
