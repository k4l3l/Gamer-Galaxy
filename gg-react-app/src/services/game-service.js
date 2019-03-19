import { get } from '../data/crud'

class GameService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/game';
        this.allGamesUrl = `${this.baseUrl}/all`;
    }

    getTopRatedGames() {
        return get(this.allGamesUrl);
    }
}

export default GameService;