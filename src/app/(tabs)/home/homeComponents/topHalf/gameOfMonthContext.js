import React from "react"

function dateCheck(monthlyGameListings, monthlyGameData) {
        const d = new Date()
        let month = d.getMonth()
        const monthData = [
            { console: 'sgGenesis', game: 'sonic-the-hedgehog-2', genreGroup: monthlyGameListings.genreGroupJan, monthName: 'January' },
            { console: 'sg32X', game: '', genreGroup: monthlyGameListings.genreGroupFeb, monthName: 'February' },
            { console: 'sgGenesis', game: 'sonic-the-hedgehog-2', genreGroup: monthlyGameListings.genreGroupMar, monthName: 'March' },
            { console: 'sgGenesis', game: 'sonic-the-hedgehog-2', genreGroup: monthlyGameListings.genreGroupApr, monthName: 'April' },
            { console: 'sgGenesis', game: 'sonic-the-hedgehog-2', genreGroup: monthlyGameListings.genreGroupMay, monthName: 'May' },
            { console: 'sgGenesis', game: '', genreGroup: monthlyGameListings.genreGroupJun, monthName: 'June' },
            { console: 'sgCD', game: '', genreGroup: monthlyGameListings.genreGroupJul, monthName: 'July' },
            { console: 'sgGG', game: '', genreGroup: monthlyGameListings.genreGroupAug, monthName: 'August' },
            { console: 'sgGenesis', game: '', genreGroup: monthlyGameListings.genreGroupSep, monthName: 'September' },
            { console: 'sg1000', game: '', genreGroup: monthlyGameListings.genreGroupOct, monthName: 'October' },
            { console: 'sgGenesis', game: 'streets-of-rage-2', genreGroup: monthlyGameListings.genreGroupNov, monthName: 'November' },
            { console: 'sgGenesis', game: 'sonic-the-hedgehog-2', genreGroup: monthlyGameListings.genreGroupDec, monthName: 'December' }
        ]
    
        const currentMonthData = monthData[month]
        return monthlyGameData(currentMonthData.console, currentMonthData.game, currentMonthData.genreGroup, currentMonthData.monthName)
}

export const gameOfMonthData = {
    dateCheck,
}

export const gameOfMonthContext = React.createContext(gameOfMonthData)