const should = require("chai").should()
const GameResult = require("../../dataAccess/GameResult")

describe("GameResult class", () => {

    const SAMPLE_LINE = "Thieves 1, FC Fraudsters 0"

    it("will parse a single line from the input file", () => {
        const gameResult = GameResult.parse(SAMPLE_LINE)
        should.exist(gameResult)
        gameResult.should.be.an.instanceOf(GameResult)
    })

    it("will have properties for the two teams with theirs corresponding scores", () => {
        const gameResult = GameResult.parse(SAMPLE_LINE)
        should.exist(gameResult)
        
        gameResult.should.have.property("firstTeamName", "Thieves")
        gameResult.should.have.property("firstTeamScore", 1)
        gameResult.should.have.property("secondTeamName", "FC Fraudsters")
        gameResult.should.have.property("secondTeamScore", 0)
    })

    it("will throw an error if the first team name is empty", () => {

        try
        {
            const gameResult = new GameResult("", 1, "second", 2)
            should.not.exist(gameResult)
        }
        catch (err) {
            err.should.exist
        }
    })

    it("will throw an error if the second team name is empty", () => {

        try
        {
            const gameResult = new GameResult("first", 1, "", 2)
            should.not.exist(gameResult)
        }
        catch (err) {
            err.should.exist
        }
    })

    it("will throw an error if the first team score is negative", () => {

        try
        {
            const gameResult = new GameResult("first", "-1", "second", 2)
            should.not.exist(gameResult)
        }
        catch (err) {
            err.should.exist
        }
    })

    it("will throw an error if the second team score is negative", () => {

        try
        {
            const gameResult = new GameResult("first", "1", "second", "-2")
            should.not.exist(gameResult)
        }
        catch (err) {
            err.should.exist
        }
    })

    it("will throw an error if the first and second team names are the same", () => {

        try
        {
            const gameResult = new GameResult("first", "1", "first", "-2")
            should.not.exist(gameResult)
        }
        catch (err) {
            err.should.exist
        }
    })
})