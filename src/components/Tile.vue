<template>
    <div :style="wrapperStyle">
        <div :style="sideStyle">
            <div :style="shadowStyle"></div>
        </div>
        <div :style="tileStyle"></div>
    </div>
</template>

<script>
export default {
    name: 'Tile',
    props: ['x', 'y', 'tileData', 'mapColumns', 'mapRows'],
    data: function() {
        return {
            tileSize: 50,
        }
    },
    computed: {
        wrapperStyle() {
            return {
                position: 'absolute',
                left: `${this.left()}px`,
                top: `${this.top()}px`,
            }
        },
        tileStyle() {
            return {
                position: 'absolute',
                boxSizing: 'border-box',
                border: '1px dashed gray',
                width: `${this.tileSize}px`,
                height: `${this.tileSize}px`,
                backgroundColor: this.tileData.topColor,
                opacity: this.tileData.opacity,
            }
        },
        sideStyle() {
            return {
                position: 'absolute',
                width: `${this.hypotenuse}px`,
                height: '400px',
                backgroundColor: this.tileData.wallColor,
                opacity: this.tileData.opacity,
                transformOrigin: 'center top',
                transform: 'translate(-11px,25px) rotate(-45deg)',
            }
        },
        shadowStyle() {
            return {
                position: 'absolute',
                right: 0,
                width: '50%',
                height: '100%',
                backgroundColor: 'hsla(0, 100%, 0%, 0.2)',
            }
        },
        height() {
            return this.tileData.elevation * 10
        },
        hypotenuse() {
            return Math.sqrt(this.tileSize * this.tileSize * 2)
        }
    },
    methods: {
        left() {
            return this.x * this.tileSize - this.height
        },
        top() {
            return (this.y * this.tileSize) - this.height
        },
    },
}
</script>

<style scoped>
</style>
