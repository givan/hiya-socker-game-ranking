const should = require("chai").should()
const GameResultsReader = require("../../dataAccess/GameResultsReader")
const GameResult = require("../../dataAccess/GameResult")

describe("GameResultsReader class", () => {
    const INPUT_FILE = "test/data/input-sample.txt"

    it("will provide a factory method", () => {
        const gameResultsReaderDL = GameResultsReader.createInstance(INPUT_FILE)
        should.exist(gameResultsReaderDL)
        gameResultsReaderDL.should.be.an.instanceOf(GameResultsReader)
    })

    it("will throw if the provided path is not valid", () => {
        try{
            const gameResultsReaderDL = GameResultsReader.createInstance("INVALID FILE PATH")
            should.not.exist(gameResultsReaderDL)
        }
        catch(err) {
            should.exist(err)
        }
    })

    it("will read the contents of a file line by line", async () => {
        const reader = GameResultsReader.createInstance(INPUT_FILE)
        const expectedLinesCount = 5

        let linesCount = 0;
        for await (const line of reader.getResultsAsync()) { linesCount++ }

        linesCount.should.be.equal(expectedLinesCount)
    })

    it("will parse each line into an instance of GameResult", async () => {
        const reader = GameResultsReader.createInstance(INPUT_FILE)

        for await (const gameResult of reader.getResultsAsync()) {
            should.exist(gameResult)
            gameResult.should.be.an.instanceOf(GameResult) 
        }
    })
})