/**
 * Represnts a single team ranking
 */
class TeamRanking
{
    static createInstance(name, points, rank) {
        return new TeamRanking(name, points, rank)
    }

    constructor(name, points, rank) {
        if (name == null || typeof(name) !== "string") { throw new Error("name must be a valid string") }
        if (points == null || typeof(points) !== "number") { throw new Error("name must be a valid string") }

        this._name = name
        this._points = points

        if (rank != null) {
            this.rank = rank
        } else {
            this._rank = null
        }
    }

    /**
     * Gets the name of a given team (readoly)
     */
    get name() {
        return this._name
    }

    /**
     * Gets the points of a given team
     */
    get points() {
        return this._points
    }

    /**
     * Gets the rank for a given team
     */
    get rank() {
        return this._rank
    }

    /**
     * Sets the rank for a given team
     */
    set rank(value) {
        if (value == null || typeof(value) !== "number" || value < 0) { throw new Error("rank must be a positive number") }
        this._rank = value
    }

    toString() {
        // Example: 1. Thieves, 6 pts
        return `${this._rank}. ${this._name}, ${this._points} pts`
    }
}

module.exports = TeamRanking