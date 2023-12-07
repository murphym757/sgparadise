import React from 'react'

const genreGroupJan = [
    {genreName: 'Action', genreProvidedIndex: 3},
    {genreName: 'Strategy', genreProvidedIndex: 1},
    {genreName: 'Educational', genreProvidedIndex: 3},
]

const genreGroupFeb = [
    {genreName: 'Simulation', genreProvidedIndex: 1},
    {genreName: 'Sports', genreProvidedIndex: 4},
    {genreName: 'RPG', genreProvidedIndex: 0}
]

const genreGroupMar = [
    {genreName: 'RPG', genreProvidedIndex: 1},
    {genreName: 'Sports', genreProvidedIndex: 2},
    {genreName: 'Simulation', genreProvidedIndex: 5}
]

const genreGroupApr = [
    {genreName: 'Strategy', genreProvidedIndex: 4},
    {genreName: 'Action', genreProvidedIndex: 2},
    {genreName: 'Simulation', genreProvidedIndex:4}
]

const genreGroupMay = [
    {genreName: 'Sports', genreProvidedIndex: 5},
    {genreName: 'RPG', genreProvidedIndex: 1},
    {genreName: 'Educational', genreProvidedIndex: 2}
]

const genreGroupJun = [
    {genreName: 'Strategy', genreProvidedIndex: 5},
    {genreName: 'Action', genreProvidedIndex:1},
    {genreName: 'Simulation', genreProvidedIndex: 3}
]

const genreGroupJul = [
    {genreName: 'Educational', genreProvidedIndex: 1},
    {genreName: 'RPG', genreProvidedIndex: 2},
    {genreName: 'Action', genreProvidedIndex: 0}
]

const genreGroupAug = [
    {genreName: 'Strategy', genreProvidedIndex: 3},
    {genreName: 'Simulation', genreProvidedIndex: 2},
    {genreName: 'Sports', genreProvidedIndex: 7}
]

const genreGroupSep = [
    {genreName: 'Sports', genreProvidedIndex: 8},
    {genreName: 'Action', genreProvidedIndex: 2},
    {genreName: 'Educational', genreProvidedIndex: 0}
]

const genreGroupOct = [
    {genreName: 'Educational', genreProvidedIndex: 0},
    {genreName: 'Simulation', genreProvidedIndex: 0},
    {genreName: 'Strategy', genreProvidedIndex: 0}
]

const genreGroupNov = [
    {genreName: 'Action', genreProvidedIndex: 0},
    {genreName: 'Sports', genreProvidedIndex: 1},
    {genreName: 'Simulation', genreProvidedIndex:1}
]

const genreGroupDec = [
    {genreName: 'Sports', genreProvidedIndex: 1},
    {genreName: 'Action', genreProvidedIndex: 1},
    {genreName: 'Strategy', genreProvidedIndex: 2}
]

const monthlyGameListings = {
    genreGroupJan,
    genreGroupFeb,
    genreGroupMar,
    genreGroupApr,
    genreGroupMay,
    genreGroupJun,
    genreGroupJul,
    genreGroupAug,
    genreGroupSep,
    genreGroupOct,
    genreGroupNov,
    genreGroupDec
}

export const monthlyGameListingsContext = React.createContext(monthlyGameListings)