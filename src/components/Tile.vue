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
    props: ['x', 'y', 'time', 'tileData', 'mapColumns', 'mapRows'],
    data: function() {
        return {
            tileSize: 50,
            stepHeight: 10,
            waterLevel: 2,
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
                width: `${this.tileSize}px`,
                height: `${this.tileSize}px`,
                backgroundColor: this.timeColor(this.tileData.topHSL),
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
                    backgroundColor: this.timeColor([219, 100, 50]), //`hsl(219, 100%, 50%)`,
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
                backgroundColor: this.timeColor(this.tileData.wallHSL),
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
        timeColor(hsl) {
            let sStart = 6
            let sStep = (hsl[1] - 10) / (11 - sStart)

            let lStart = 6
            let lStep = (hsl[2] - 15) / (11 - lStart)

            hsl = [
                Math.max(0, hsl[0] - this.time * 6),
                hsl[1] - (Math.max(0, this.time - sStart) * sStep),
                hsl[2] - (Math.max(0, this.time - lStart) * lStep),
            ]
            return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`
        },
    },
}
</script>

<style scoped>
</style>
