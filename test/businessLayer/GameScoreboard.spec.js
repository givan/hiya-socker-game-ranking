const should = require("chai").should()
const GameResult = require("../../dataAccess/GameResult")
const GameScoreboard = require("../../businessLayer/GameScoreboard")
const TeamRanking = require("../../businessLayer/TeamRanking")

describe("GameScoreboard class", () => {

    const SAMPLE_LINE = "Thieves 1, FC Fraudsters 0"

    it("will provide a factory method", () => {
        const gameScoreboard = GameScoreboard.createInstance(SAMPLE_LINE)

        // assert
        should.exist(gameScoreboard)
        gameScoreboard.should.be.an.instanceOf(GameScoreboard)
    })

    it("determine the points based on the given game result", () => {
        // arrange
        const team1Name = "Team1"
        const team2Name = "Team2"
        const gameResult = new GameResult(team1Name, 1, team2Name, 3)

        const expTeam2Pts = 3
        const expTeam1Pts = 0

        // act
        const gameScoreboard = GameScoreboard.createInstance()
        gameScoreboard.record(gameResult)

        // assert
        gameScoreboard.should.have.property("_teamScores")
        gameScoreboard._teamScores.should.have.length(2)

        should.exist(gameScoreboard._teamScores.get(team1Name))
        should.exist(gameScoreboard._teamScores.get(team2Name))
        
        gameScoreboard._teamScores.get(team1Name).should.be.equal(expTeam1Pts)
        gameScoreboard._teamScores.get(team2Name).should.be.equal(expTeam2Pts)
    })

    it("add more the points to an existing team", () => {
        // arrange
        const team1Name = "Team1"
        const team2Name = "Team2"
        const game1 = new GameResult(team1Name, 1, team2Name, 3)
        const game2 = new GameResult(team1Name, 3, team2Name, 3)

        const expTeam1Pts = 1 // 1 draw
        const expTeam2Pts = 4 // 1 win and 1 draw


        // act
        const gameScoreboard = GameScoreboard.createInstance()
        gameScoreboard.record(game1)
        gameScoreboard.record(game2)

        // assert
        gameScoreboard.should.have.property("_teamScores")
        gameScoreboard._teamScores.should.have.length(2)

        should.exist(gameScoreboard._teamScores.get(team1Name))
        should.exist(gameScoreboard._teamScores.get(team2Name))
        
        gameScoreboard._teamScores.get(team1Name).should.be.equal(expTeam1Pts)
        gameScoreboard._teamScores.get(team2Name).should.be.equal(expTeam2Pts)
    })

    it("add new team to existing board", () => {
        // arrange
        const team1Name = "Team1"
        const team2Name = "Team2"
        const game1 = new GameResult(team1Name, 1, team2Name, 3)

        const team3Name = "Team3"
        const game2 = new GameResult(team1Name, 3, team3Name, 3) // it's a draw

        const expTeam3Pts = 1

        // act
        const gameScoreboard = GameScoreboard.createInstance()
        gameScoreboard.record(game1)
        gameScoreboard.record(game2)

        // assert
        gameScoreboard.should.have.property("_teamScores")
        gameScoreboard._teamScores.should.have.length(3)

        should.exist(gameScoreboard._teamScores.get(team3Name))
        
        gameScoreboard._teamScores.get(team3Name).should.be.equal(expTeam3Pts)
    })

    it("will rank the teams first based on their points", () => {
        // arrange
        const team1Name = "Team1"
        const team2Name = "Team2"
        const game1 = new GameResult(team1Name, 1, team2Name, 3)

        const team3Name = "Team3"
        const game2 = new GameResult(team1Name, 3, team3Name, 3) // it's a draw

        const expTeam3Pts = 1

        // act
        const gameScoreboard = GameScoreboard.createInstance()
        gameScoreboard.record(game1)
        gameScoreboard.record(game2)
        const rankings = gameScoreboard.rank()

        // assert
        should.exist(rankings)
        rankings.should.be.an("array").with.length(3)
        rankings[0].should.be.an.instanceOf(TeamRanking).and.have.property("name", team2Name)
        rankings[1].should.be.an.instanceOf(TeamRanking).and.have.property("name", team1Name)
        rankings[2].should.be.an.instanceOf(TeamRanking).and.have.property("name", team3Name)
    })

    it("will rank the teams with the same rank if they have the same points", () => {
        // arrange
        const team1Name = "A"
        const team2Name = "C"
        const game1 = new GameResult(team1Name, 1, team2Name, 1)

        const team3Name = "B"
        const team4Name = "D"
        const game2 = new GameResult(team3Name, 1, team4Name, 1) 

        const expTeamPts = 1 // expected all teams to have 1 point

        // act
        const gameScoreboard = GameScoreboard.createInstance()
        gameScoreboard.record(game1)
        gameScoreboard.record(game2)
        const rankings = gameScoreboard.rank()

        // assert
        should.exist(rankings)
        rankings.should.be.an("array").with.length(4)

        rankings[0].should.be.an.instanceOf(TeamRanking).and.have.property("name", team1Name)
        rankings[1].should.be.an.instanceOf(TeamRanking).and.have.property("name", team3Name)
        rankings[2].should.be.an.instanceOf(TeamRanking).and.have.property("name", team2Name)
        rankings[3].should.be.an.instanceOf(TeamRanking).and.have.property("name", team4Name)

        rankings.every((teamRanking) => teamRanking.rank === 1).should.be.true
    })

    it("will rank the teams with the same rank if they have the same points and continue the rank based on the count", () => {
        // arrange
        const team1Name = "A"
        const team2Name = "C"
        const game1 = new GameResult(team1Name, 1, team2Name, 1)

        const team3Name = "B"
        const team4Name = "D"
        const game2 = new GameResult(team3Name, 1, team4Name, 1) 

        const team5Name = "Z"
        const team6Name = "X"
        const game3 = new GameResult(team5Name, 4, team6Name, 1) // team Z is the winner and leader with 3 points and X has 0

        // Expected ranking:
        // Z -> 1st
        // A, B, C and D -> 2nd 
        // X -> 6th

        // act
        const gameScoreboard = GameScoreboard.createInstance()
        gameScoreboard.record(game1)
        gameScoreboard.record(game2)
        gameScoreboard.record(game3)
        const rankings = gameScoreboard.rank()

        // assert
        should.exist(rankings)
        rankings.should.be.an("array").with.length(6)

        rankings[0].should.be.an.instanceOf(TeamRanking).and.have.property("rank", 1)
        rankings[0].should.have.property("points", 3)

        rankings[1].should.be.an.instanceOf(TeamRanking).and.have.property("rank", 2)
        rankings[2].should.be.an.instanceOf(TeamRanking).and.have.property("rank", 2)
        rankings[3].should.be.an.instanceOf(TeamRanking).and.have.property("rank", 2)
        rankings[4].should.be.an.instanceOf(TeamRanking).and.have.property("rank", 2)

        rankings[5].should.be.an.instanceOf(TeamRanking).and.have.property("rank", 6)
        rankings[5].should.have.property("points", 0)
    })
})