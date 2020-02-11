#!/usr/bin/env node

const readline = require("readline")
const fs = require("fs");

const GameResultsReader = require("./dataAccess/GameResultsReader")
const GameScoreboard = require("./businessLayer/GameScoreboard")

async function main(filePath) {
    console.debug(`Input file: ${filePath}`)

    const reader = GameResultsReader.createInstance(filePath)

    let gameScoreboard = GameScoreboard.createInstance()

    // we read the file line by line so in case of of large input file
    // potential optimizations here could be to split up the file into chunks and 
    // load it up in child processes to parallelize reading and parsing the file
    for await (const gameResult of reader.getResultsAsync())
    {
        gameScoreboard.record(gameResult)
    }

    const rankings = gameScoreboard.rank()
    rankings.forEach((ranking) => console.log(ranking.toString()))
}

const args = require('minimist')(process.argv.slice(2));
const inputFile = args["input"] || "test/data/input-sample.txt"
main(inputFile)