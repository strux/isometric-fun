<template>
  <div>
    <div class="row" v-for="(val, rowIndex) in tileData.height" :key="rowIndex">
      <tile v-for="(val, columnIndex) in tileData.width" :x="columnIndex" :y="rowIndex" :time="time" :tileData="tileData.tiles[tileIndex(columnIndex, rowIndex)]" :mapColumns="tileData.width" :mapRows="tileData.height" :key="columnIndex + ',' + rowIndex"></tile>
    </div>
  </div>
</template>

<script>
import Tile from './Tile.vue'
export default {
  name: 'TileRenderer',
  props: ['tileData', 'time'],
  data: function() {
    return {
    }
  },
  computed: {
  },
  methods: {
    tileIndex(x, y) {
      return (y * this.tileData.width) + x
    },
  },
  components: {
    Tile,
  }
}
</script>

<style scoped>
</style>
