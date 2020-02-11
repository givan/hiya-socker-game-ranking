/**
 * Represents a single game result for 2 teams and the goals each scored
 * Can parse a line from the input file
 */
class GameResult {
    /*
        Parses a line from the input game file
    */
    static parse(line) {

        let gameResult = null;

        if (line == null || typeof(line) !== 'string' || line.length === 0) {
            throw new Error("line is not a valid string")
        }

        // single line format: Robots 3, Spammers 3
        const parts = line.split(",")
        if (parts.length === 2) {
            let firstTeamScore = GameResult._parseTeamScore(parts[0])
            let secondTeamScore = GameResult._parseTeamScore(parts[1])

            if (firstTeamScore != null && secondTeamScore != null) {
                gameResult = new GameResult(firstTeamScore.name, firstTeamScore.score, secondTeamScore.name, secondTeamScore.score)
            }
        }

        return gameResult
    }

    /**
     * Parses a single team sore
     * @param {string} teamScore A single team score from the input file - Example: Robots 3
     */
    static _parseTeamScore(teamScore) {
        let parsedScore = null

        teamScore = teamScore.trim()
        if (teamScore.length > 0) {

            const lastSpace = teamScore.lastIndexOf(" ")
            if (lastSpace > 0) {
                let name = teamScore.substring(0, lastSpace)
                let score = teamScore.substring(lastSpace + 1)

                teamScore = { name, score}
            }
        }

        return teamScore
    }

    constructor(firstTeamName, firstTeamScore, secondTeamName, secondTeamScore) {
        if (firstTeamName == null || typeof(firstTeamName) !== "string" || firstTeamName.length === 0) {
            throw new Error("firstTeamName is required string")
        }
        if (firstTeamScore == null || Number.parseInt(firstTeamScore) === NaN || Number.parseInt(firstTeamScore) < 0) {
            throw new Error("firstTeamScore is required number")
        }
        if (secondTeamName == null || typeof(secondTeamName) !== "string" || secondTeamName.length === 0) {
            throw new Error("secondTeamName is required string")
        }
        if (secondTeamScore == null || Number.parseInt(secondTeamScore) === NaN || Number.parseInt(secondTeamScore) < 0) {
            throw new Error("secondTeamScore is required number")
        }
        if (firstTeamName === secondTeamName) { throw new Error("firstTeamName and secondTeamName must be different strings")}

        this._firstTeamName = firstTeamName
        this._firstTeamScore = Number.parseInt(firstTeamScore)
        this._secondTeamName = secondTeamName
        this._secondTeamScore = Number.parseInt(secondTeamScore)
    }

    /**
     * First team name (string)
     */
    get firstTeamName() { return this._firstTeamName }
    /**
     * First team score (number)
     */
    get firstTeamScore() { return this._firstTeamScore }
    /**
     * Second team name (string)
     */
    get secondTeamName() { return this._secondTeamName }
    /**
     * Second team score (number)
     */
    get secondTeamScore() { return this._secondTeamScore }
}

module.exports = GameResult