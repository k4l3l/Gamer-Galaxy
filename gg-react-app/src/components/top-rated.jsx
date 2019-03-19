import React, { Component, Fragment } from 'react';
import GameCard from './game-card';
import Loading from './loading';
import GameService from '../services/game-service'

class TopRated extends Component {
    state = {
        games: [],
        isLoading: false,
    }
    
    static service = new GameService();

    render() {
        const { games, isLoading } = this.state;
        if(isLoading){
            return <Loading />;
        }

        if(!games.length && !isLoading){
            return (
                <div>
                    <h2>No games</h2>
                </div>
            )
        }
        return (
            <Fragment>
                <h2>Top rated:</h2>
                {
                    games.map(game => (
                        <GameCard key={game._id} {...game} />
                    ))
                }
            </Fragment>
        );
    }

    async componentDidMount(){
        try {
            const games = await TopRated.service.getTopRatedGames();
            
            this.setState({ games });
        }
        catch(error) {
            console.error(error);
        }
    }
}

export default TopRated;
