import React, { useState, useEffect, Fragment } from 'react';
import useDidMountEffect from './useDidMountEffect';
import Loader from './Loader';
import PreviousGames from './PreviousGames';
import NewGame from './NewGame';
import Navbar from './Navbar';

const Home = () => {
    // loading if false displays the loader.
    const [loading, setLoading] = useState(true)
    // scorecards are loaded to display previous games/scorecards. See useEffect below.
    const [scorecards, setScorecards] = useState({});

    // Component checks if scorecard is loaded, sets loading state to false.
    useDidMountEffect(() => {
        setLoading(false);
    }, [scorecards]);

    // load and set scorecards state.
    useEffect(() => {
        const url = "/scorecards/all_scorecards.json";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            }).then((data) => setScorecards(data))
    }, []);

    return (
        <div>
            {/* Component contains a simple navbar. */}
            <Navbar />
            <div className="">
                <div className="">
                    <div className="container secondary-color">
                        <h1 className="display-4">PROS vs JOES</h1>
                        <p className="lead">Keep track of your golf game!</p>
                        {/* Component contains new game view/logic. */}
                        {loading ? null : <NewGame setScorecards={setScorecards} />}
                        <hr className="my-4" />
                        <div className='row'>
                            {/* Component displays previous games. */}
                            {loading ? <Loader /> : <PreviousGames scorecards={scorecards} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;