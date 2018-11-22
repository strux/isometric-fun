const elevationMap = [
    '0000000000',
    '0123210000',
    '0000000000',
    '0000000000',
    '0000000000',
    '0000000000',
    '0000000000',
    '0000000000',
    '0000000000',
    '0000000000',
]

const typeMap = [
    'dddddddddd',
    'dddddddddd',
    'dddddddddd',
    'dddddddddd',
    'ddwwwwdddd',
    'ddwwwwdddd',
    'ddwwwwdddd',
    'dddddddddd',
    'dddddddddd',
    'dddddddddw',
]

const typeDict = {
    d: {
        topColor: '#4a9c5a',
        wallColor: '#926722',
        opacity: 1,
    },
    w: {
        topColor: '#63c9d4',
        wallColor: '#63c9d4',
        opacity: 0.7,
    },
}

const tiles = []
for (let i=0; i<elevationMap.length; i++) {
    let elevations = elevationMap[i].split('')
    let types = typeMap[i].split('')
    for (let j=0; j<elevations.length; j++) {
        tiles[(i * elevations.length) + j] = { 
            ...typeDict[types[j]],
            elevation: elevations[j],
        }
    }
}

const tileData = {
    width: elevationMap[0].length,
    height: elevationMap.length,
    tiles: tiles
}

export default tileData
