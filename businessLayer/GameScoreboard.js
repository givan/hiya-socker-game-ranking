const GameResult = require("../dataAccess/GameResult")
const TeamRanking = require("./TeamRanking")

/**
 * The score board for all the games played within a season (an array of GameResult objects)
 */
class GameScoreboard {
    static createInstance() {
        return new GameScoreboard()
    }

    constructor() {
        this._teamScores = new Map()
        this._teamRankings = []
    }

    /**
     * Adds a game result to the scoreboard (doesn't rank yet)
     * @param {GameResult} gameResult the game result to add to the scoreboard
     */
    record(gameResult) {
        if (gameResult == null || !(gameResult instanceof GameResult)) {
            throw new Error("gameResult must be a valid GameResult instance")
        }

        const res = this._determineTeamPoints(gameResult)
        this._recordPoints(gameResult.firstTeamName, res.firstTeamPts)
        this._recordPoints(gameResult.secondTeamName, res.secondTeamPts)
    }

    /**
     * Ranks the teams in the current score board based on the games played
     */
    rank() {
        if (this._teamScores.size > 0) {
            this._teamRankings = this._createRankingsFromScores()
            this._sortTeamRankings()
            this._calculateTeamPositions()
        }

        return this._teamRankings
    }

    _sortTeamRankings() {
        // sort first based on team's score (desc) and then on team name (asc)
        this._teamRankings.sort((teamRank1, teamRank2) => {
            if (teamRank1.points != teamRank2.points) {
                return teamRank2.points - teamRank1.points // in descending order
            }
            else {
                return teamRank1.name.localeCompare(teamRank2.name)
            }
        })
    }

    _calculateTeamPositions() {
        // set the rank for the first team -- we only call this method if we had at least 1 team result (so at least 2 teams)
        let currentRank = 1
        this._teamRankings[0].rank = currentRank
        let rankPts = this._teamRankings[0].points

        // now starting from second team, determine the rank as follows:
        // If two or more teams have the same number of points,
        // they should have the same rank and be printed in alphabetical order (as in the
        // tie for 3rd place in the sample data).
        for (let i = 1; i < this._teamRankings.length; i++) {
            const currentTeamRanking = this._teamRankings[i];

            if (currentTeamRanking.points === rankPts) {
                currentTeamRanking.rank = currentRank
            } else {
                currentTeamRanking.rank = i + 1 // if there were draws before this team, the current team need to get the i-th position 

                currentRank = currentTeamRanking.rank
                rankPts = currentTeamRanking.points
            }
        }
    }

    _createRankingsFromScores() {
        // flatten out the map and construct TeamRanking objects from it
        const teamScoresArr = [...this._teamScores.entries()]
        return teamScoresArr.map((entry) => TeamRanking.createInstance(entry[0], entry[1]))
    }

    _determineTeamPoints(gameResult) {
        // In this league, a draw (tie) is worth 1 point and a win is worth 3 points. A loss is worth 0 points.
        let firstTeamPts = 1, secondTeamPts = 1 // it's a draw if not proven otherwise

        if (gameResult.firstTeamScore > gameResult.secondTeamScore) {
            firstTeamPts = 3 // first team is a winner
            secondTeamPts = 0
        }
        else if (gameResult.firstTeamScore < gameResult.secondTeamScore) {
            firstTeamPts = 0
            secondTeamPts = 3 // second team is a winner
        }

        return { firstTeamPts, secondTeamPts }
    }

    _recordPoints(teamName, teamPts) {
        let totalPoints = teamPts

        if (this._teamScores.has(teamName)) {
            totalPoints += this._teamScores.get(teamName)
        }

        this._teamScores.set(teamName, totalPoints)
    }
}

module.exports = GameScoreboard