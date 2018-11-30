<template>
  <div :style="maskStyle">
    <div class="row" v-for="rowIndex in visibleRows" :key="rowIndex">
      <tile
        v-for="columnIndex in visibleColumns"
        :x="columnIndex - playerPosition[0]"
        :y="rowIndex - playerPosition[1]"
        :time="time"
        :tile-size="tileSize"
        :tileData="tileData.tiles[tileIndex(columnIndex, rowIndex)]"
        :key="columnIndex + ',' + rowIndex">
      </tile>
    </div>
  </div>
</template>

<script>
import Tile from './Tile.vue'
export default {
  name: 'TileRenderer',
  props: ['playerPosition', 'tileData', 'time'],
  data: function() {
    return {
      tileSize: 50,
      tileBuffer: 1,
    }
  },
  computed: {
    visibleRows () {
      return this.range(this.playerPosition[1], this.playerPosition[1] + (this.tileData.viewHeight-1))
    },
    visibleColumns () {
      return this.range(this.playerPosition[0], this.playerPosition[0] + (this.tileData.viewWidth-1))
    },
    maskStyle () {
      return {
        width: `${this.tileSize * this.tileData.viewWidth}px`,
        height: `${this.tileSize * this.tileData.viewHeight}px`,
        //overflow: 'hidden',
      }
    },
  },
  watch: {
  },
  methods: {
    tileIndex(x, y) {
      return (y * this.tileData.width) + x
    },
    range (start, end) {
      return [...Array(1+end-start).keys()].map(v => start+v)
    },
  },
  components: {
    Tile,
  }
}
</script>

<style scoped>
</style>
