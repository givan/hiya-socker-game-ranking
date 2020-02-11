const fs = require("fs")
const readline = require("readline")
const GameResult = require("./GameResult")

/**
 * Reads the socker results file as a stream line by line. Provides an interator over the data
 */
class GameResultsReader {
    static createInstance(filePath) {
        // make sure the input file path is valid - this will throw if there is no read perm on the input file
        fs.accessSync(filePath, fs.constants.R_OK)

        return new GameResultsReader(filePath)
    }

    constructor(filePath) {
        this._filePath = filePath
    }

    /**
     * Reads the input file line by line and yields every line as a GameResult object
     */
    async * getResultsAsync() {
        const rl = readline.createInterface({
            input: fs.createReadStream(this._filePath)
        })
    
        for await (const line of rl) {
            const gameResult = GameResult.parse(line)
            yield gameResult
        }
    }
}

module.exports = GameResultsReader