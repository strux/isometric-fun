<template>
  <div :style="maskStyle">
    <div class="row" v-for="rowIndex in visibleRows" :key="rowIndex">
      <tile
        v-for="columnIndex in visibleColumns"
        :x="columnIndex - playerPosition[0]"
        :y="rowIndex - playerPosition[1]"
        :time="time"
        :tile-size="tileSize"
        :tile-data="tileData.tiles[tileIndex(columnIndex, rowIndex)]"
        :water-level="tileData.waterLevel"
        :key="columnIndex + ',' + rowIndex">
      </tile>
    </div>
  </div>
</template>

<script>
import Tile from './Tile.vue'
export default {
  name: 'TileRenderer',
  props: ['playerPosition', 'tileData', 'time', 'editing'],
  data: function() {
    return {
      tileSize: 50,
      tileBuffer: 1,
    }
  },
  computed: {
    visibleRows () {
      let rows = this.tileData.height - 1
      if (!this.editing) {
        // we are rendering one extra row for when there are transparent tiles at the top (water)
        rows = this.range(this.playerPosition[1], this.playerPosition[1] + (this.tileData.viewHeight))
      }
      return rows
    },
    visibleColumns () {
      let columns = this.tileData.width - 1
      if (!this.editing) {
        // we are rendering one extra row for when there are transparent tiles at the left (water)
        columns = this.range(this.playerPosition[0], this.playerPosition[0] + (this.tileData.viewWidth))
      }
      return columns
    },
    maskStyle () {
      return {
        width: `${this.tileSize * this.tileData.viewWidth}px`,
        height: `${this.tileSize * this.tileData.viewHeight}px`,
        overflow: this.editing ? 'visible' : 'hidden',
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
