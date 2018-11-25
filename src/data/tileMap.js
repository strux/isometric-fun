const elevationMap = [
    '3333333333',
    '3333333333',
    '3333333333',
    '3333333333',
    '3332222333',
    '3332122333',
    '3332122333',
    '3332222333',
    '3333333333',
    '3333333333',
]

const typeMap = [
    'dddddddddd',
    'dddddddddd',
    'dddddddddd',
    'ddssssssdd',
    'ddssssssdd',
    'ddssssssdd',
    'ddssssssdd',
    'ddssssssdd',
    'ddssssssdd',
    'dddddddddd',
]

const typeDict = {
    d: {
        topColor: 'hsl(132, 36%, 45%)',
        wallColor: 'hsl(37, 62%, 35%)',
        opacity: 1,
        shadowOpacity: 0.2,
    },
    s: {
        topColor: 'hsl(64, 57%, 65%)',
        wallColor: 'hsl(64, 57%, 65%)',
        sideOpacity: 0,
        shadowOpacity: 0.2,
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
