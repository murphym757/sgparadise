import React from 'react';

function findCover(api, igdbGameId, setCoversResults) {
    const igdbCoversURL = 'https://api.igdb.com/v4/covers'
    const igdbCoversResultsField = `fields image_id; where game = (${igdbGameId});`
    const axiosTimeout = {timeout: 2000}
    return(
        api.post(igdbCoversURL, igdbCoversResultsField, axiosTimeout)
            .then(res => {
                setCoversResults(res.data)
            }, [])
            .catch(err => {
                console.log(err);
            })
            .then(function () {
                // always executed
            })
    )
}

function findScreenshots(api, igdbGameId, setGameScreenshots) {
    const igdbScreenshotsURL = 'https://api.igdb.com/v4/screenshots'
    const igdbScreenshotsResultsField = `fields image_id; where game = (${igdbGameId});`
    const axiosTimeout = {timeout: 2000}
    return(
        api.post(igdbScreenshotsURL, igdbScreenshotsResultsField, axiosTimeout)
            .then(res => {
                setGameScreenshots(res.data)
            }, [])
            .catch(err => {
                console.log(err);
            })
            .then(function () {
                // always executed
            })
    )
}

function findPublishers(api, igdbGameId, setGamePublishersResults) {
    const igdbInvolvesCompaniesURL = 'https://api.igdb.com/v4/involved_companies'
    const igdbInvolvesCompaniesResultsPubField =`fields company,publisher; where publisher = true & game = (${igdbGameId});`
    const axiosTimeout = {timeout: 2000}
    return(
        api.post(igdbInvolvesCompaniesURL, igdbInvolvesCompaniesResultsPubField, axiosTimeout)
            .then(res => {
                setGamePublishersResults(res.data)
            }, [])
            .catch(err => {
                console.log(err);
            })
            .then(function () {
                // always executed
            })
    )
}

function findDevelopers(api, igdbGameId, setGameDevelopersResults) {
    const igdbInvolvesCompaniesURL = 'https://api.igdb.com/v4/involved_companies'
    const igdbInvolvesCompaniesResultsDevField =`fields company,developer; where developer = true & game = (${igdbGameId});`
    const axiosTimeout = {timeout: 2000}
    return(
        api.post(igdbInvolvesCompaniesURL, igdbInvolvesCompaniesResultsDevField, axiosTimeout)
            .then(res => {
                setGameDevelopersResults(res.data)
            }, [])
            .catch(err => {
                console.log(err);
            })
            .then(function () {
                // always executed
            })
    )
}

function findGameNameJPN(api, igdbGameId, setGameNameJPNAlt) {
    const igdbNameAltsURL = 'https://api.igdb.com/v4/alternative_names'
    const igdbNameAltsJPNResultsField = `fields name; where game = (${igdbGameId}) & comment = "Japanese title - romanization";`
    const axiosTimeout = {timeout: 2000}
    return (
        api.post(igdbNameAltsURL, igdbNameAltsJPNResultsField, axiosTimeout)
            .then(res => {
                setGameNameJPNAlt(res.data)
            }, [])
            .catch(err => {
                console.log(err);
            })
            .then(function () {
                // always executed
            })
    )
}

function findGameNameEUR(api, igdbGameId, setGameNameEURAlt) {
    const igdbNameAltsURL = 'https://api.igdb.com/v4/alternative_names'
    const igdbNameAltsEURResultsField = `fields name; where game = (${igdbGameId}) & comment = "European title";`
    const axiosTimeout = {timeout: 2000}
    return (
        api.post(igdbNameAltsURL, igdbNameAltsEURResultsField, axiosTimeout)
            .then(res => {
                setGameNameEURAlt(res.data)
            }, [])
            .catch(err => {
                console.log(err);
            })
            .then(function () {
                // always executed
            })
    )
}

function findGameNameBRZ(api, igdbGameId, setGameNameBRZAlt) {
    const igdbNameAltsURL = 'https://api.igdb.com/v4/alternative_names'
    const igdbNameAltsBRZResultsField = `fields name; where game = (${igdbGameId}) & comment = "Portuguese title - translated)";`
    const axiosTimeout = {timeout: 2000}
    return (
        api.post(igdbNameAltsURL, igdbNameAltsBRZResultsField, axiosTimeout)
            .then(res => {
                setGameNameBRZAlt(res.data)
            }, [])
            .catch(err => {
                console.log(err);
            })
            .then(function () {
                // always executed
            })
    )
}

export const axiosSearch = {
    findCover,
    findScreenshots,
    findPublishers,
    findDevelopers,
    findGameNameJPN,
    findGameNameEUR,
    findGameNameBRZ
}

export const axiosSearchContext = React.createContext(axiosSearch)