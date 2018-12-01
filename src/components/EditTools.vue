<template>
  <div :style="style">
    <button v-on:click="$emit('toggle-perspective')">Toggle perspective</button>
    <label for="time">Time</label>
    <input id="time" type="range" min="0" max="11" v-bind:value="time" v-on:change="$emit('set-time', $event.target.value)">
    <label for="waterLevel">Water Level</label>
    <input id="waterLevel" type="range" min="0" max="9" v-bind:value="tileData.waterLevel" v-on:change="$emit('set-water-level', $event.target.value)">
  </div>
</template>

<script>
export default {
  name: 'EditTools',
  props: ['tileData', 'time'],
  data: function() {
    return {
    }
  },
  computed: {
    style() {
      return {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '200px',
      }
    },
  },
  watch: {
  },
  methods: {
  },
  components: {
  }
}
</script>

<style scoped>
  label, input {
    display: block;
  }
</style>
