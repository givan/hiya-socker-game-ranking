const should = require("chai").should()
const TeamRanking = require("../../businessLayer/TeamRanking")

describe("TeamRanking class", () => {

    it("will provide a factory method", () => {
        const teamRank = TeamRanking.createInstance("teamName", 6)

        // assert
        should.exist(teamRank)
        teamRank.should.be.an.instanceOf(TeamRanking)
    })

    it("will provide read-only properties on getting name and points", () => {
        // arrange
        const teamName = "AB"
        const teamPts = 77

        // act
        const teamRank = TeamRanking.createInstance(teamName, teamPts)

        // assert
        should.exist(teamRank)
        teamRank.should.be.an.instanceOf(TeamRanking)
        teamRank.should.have.property("name", teamName)
        teamRank.should.have.property("points", teamPts)
    })

    it("will provide get and set rank property", () => {
        // arrange
        const teamName = "AB"
        const teamPts = 77
        const rank = 69

        // act
        const teamRank = TeamRanking.createInstance(teamName, teamPts)
        teamRank.rank = rank

        // assert
        teamRank.should.have.property("rank", rank)
    })

    it("will override the toString() method to provide a well formatted string for a singel team rank", () => {
        // Example: 1. Thieves, 6 pts
        const rank = 1
        const name = "Thieves"
        const points = 6
        const expectedString = "1. Thieves, 6 pts"

        // act
        const teamRank = TeamRanking.createInstance(name, points, rank)

        // assert
        teamRank.toString().should.be.equal(expectedString)
    });
})