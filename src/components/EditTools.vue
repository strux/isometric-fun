<template>
  <div :style="style">
    <button v-on:click="$emit('toggle-perspective')">Toggle perspective</button>
    <input type="range" min="0" max="11" v-bind:value="time" v-on:change="$emit('set-time', $event.target.value)">
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
</style>
