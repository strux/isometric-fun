<template>
  <div :style="style">
    <button v-on:click="$emit('toggle-perspective')">Toggle perspective</button>
    <label for="time">Time</label>
    <input id="time" type="range" min="0" max="11" v-bind:value="time" v-on:change="$emit('set-time', $event.target.value)">
    <label for="waterLevel">Water Level</label>
    <input id="waterLevel" type="range" min="0" max="9" v-bind:value="tileData.waterLevel" v-on:change="$emit('set-water-level', $event.target.value)">
    <label for="rows">Map Rows</label>
    <input id="rows" type="range" min="0" max="100" v-bind:value="tileData.height" v-on:change="updateRows">
    <label for="columns">Map Columns</label>
    <input id="columns" type="range" min="0" max="100" v-bind:value="tileData.width" v-on:change="updateColumns">
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
      let newRowCount = totalRows - this.tileData.height
      let newTileCount = newRowCount * this.tileData.width
      if (newRowCount > 0) {
        let newTiles = Array(newTileCount).fill({ ...tileDict['d'], elevation: this.tileData.waterLevel })
          this.localTileData.tiles.push(...newTiles)
      } else {
        this.localTileData.tiles.splice(newTileCount, -newTileCount)
      }
      this.localTileData.height = totalRows
      this.$emit('set-tile-data', this.localTileData)
    },
    updateColumns(event) {
      let totalColumns = parseInt(event.target.value)
      let newColumnCount = totalColumns - this.tileData.width
      if (newColumnCount > 0) {
        for (let i=0; i<this.localTileData.height; i++) {
          let newTiles = Array(newColumnCount).fill({ ...tileDict['d'], elevation: this.tileData.waterLevel })
          let index = this.localTileData.width * (i + 1) + (newColumnCount * i)
          this.localTileData.tiles.splice(index+1, 0, ...newTiles)
        }
      } else {
        for (let i=0; i<this.localTileData.height; i++) {
          let index = this.localTileData.width * (i + 1) + (newColumnCount * i)
          this.localTileData.tiles.splice(index+1, -newColumnCount)
        }
      }
      this.localTileData.width = totalColumns
      this.$emit('set-tile-data', this.localTileData)
    },
  },
}
</script>

          <style scoped>
label, input {
  display: block;
}
          </style>
