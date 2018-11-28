<template>
    <div :style="wrapperStyle">
        <div :style="sideStyle">
            <div :style="shadowStyle"></div>
        </div>
        <div :style="tileStyle"></div>
        <div :style="waterStyle"></div>
    </div>
</template>

<script>
export default {
    name: 'Tile',
    props: ['x', 'y', 'tileData', 'mapColumns', 'mapRows'],
    data: function() {
        return {
            tileSize: 50,
            stepHeight: 10,
            waterLevel: 2,
            time: 0,
        }
    },
    computed: {
        topColor() {
            let hsl = this.tileData.topHSL
            let hslString = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`
            return hslString
        },
        wallColor() {
            let hsl = this.tileData.wallHSL
            let hslString = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`
            return hslString
        },
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
                width: `${this.tileSize}px`,
                height: `${this.tileSize}px`,
                backgroundColor: this.topColor,
                opacity: this.tileData.opacity,
            }
        },
        waterStyle() {
            if (this.tileData.elevation <= this.waterLevel) {
                return {
                    position: 'relative',
                    boxSizing: 'border-box',
                    width: `${this.tileSize}px`,
                    height: `${this.tileSize}px`,
                    backgroundColor: `hsl(219, 100%, 50%)`,
                    opacity: 0.3,
                    top: `-${(this.waterLevel - this.tileData.elevation + 1) * this.stepHeight}px`,
                    left: `-${(this.waterLevel - this.tileData.elevation + 1) * this.stepHeight}px`,
                }
            }
        },
        sideStyle() {
            return {
                position: 'absolute',
                width: `${this.hypotenuse}px`,
                height: '400px',
                backgroundColor: this.wallColor,
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
                backgroundColor: `hsla(0, 100%, 0%, ${this.tileData.shadowOpacity})`,
            }
        },
        height() {
            return (this.tileData.elevation - this.waterLevel) * this.stepHeight
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
