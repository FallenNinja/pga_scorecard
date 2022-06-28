import React, { useState, Fragment, useEffect } from 'react';
import PGA_Frisco_East from './courses/PGA_Frisco_East.json';

// Component allows user to create new games and track the score of the game.
// NOTE: This could be better optimized and cleaned up.
const NewGame = ({ setScorecards }) => {
    // Track current page when creating a new game.
    const [currentPage, setCurrentPage] = useState(1);
    // Set current course the game will be played in.
    const [currentCourse, setCurrentCourse] = useState(null)
    const [playerOne, setPlayerOne] = useState([])
    const [playerTwo, setPlayerTwo] = useState([])

    // Changes the 'page' the uses is currently in when creating a new game.
    const nextPage = () => {
        if (currentPage == 1) setCurrentPage(currentPage + 1)
        // User is unable to proceed to the next page unless certain conditions are met.
        if (currentPage == 2) {
            let pass = false
            // sets up a temporary player object that can be modified which is later used to replace the regular player object.
            let tempPlayerOne = playerOne
            tempPlayerOne.name = document.getElementById('gamePlayer1Name').value
            tempPlayerOne.allowance = document.getElementById('gamePlayer1Handicap').value
            pass = tempPlayerOne.name == null | tempPlayerOne.name.length == 0 ? false : true
            if (pass == false) return alert('Please fill in the name field.')
            pass = tempPlayerOne.allowance == null | tempPlayerOne.allowance.length == 0 ? false : true

            // Loops through temporary player object setting allowances per hole.
            // Templooper is used to reset the index number if hole length is less than allowance number,
            let tempLooper = 0
            tempPlayerOne.holes = JSON.parse(JSON.stringify(currentCourse.holes));
            if (tempPlayerOne.allowance > 0) {
                // Sort by stroke index in order to prioritize allowance to most difficult holes.
                tempPlayerOne.holes.sort((a, b) => (a.strokeIndex > b.strokeIndex) ? 1 : -1)

                for (let i = 0; i < tempPlayerOne.allowance; i++) {
                    if (i == 18) tempLooper = 18
                    if (i - tempLooper == 18) tempLooper = tempLooper + 18
                    const e = tempPlayerOne.holes[i - tempLooper];
                    e.allowance = e.allowance == NaN | e.allowance == undefined | e.allowance == null ? 0 : e.allowance
                    e.allowance -= 1
                }

                tempPlayerOne.holes.sort((a, b) => (a.number > b.number) ? 1 : -1)
            }

            // Loops through holes, verifies that allowance has a value and gross starts at 1.
            for (let i = 0; i < tempPlayerOne.holes.length; i++) {
                if (tempPlayerOne.holes[i].allowance == undefined) tempPlayerOne.holes[i].allowance = 0
                tempPlayerOne.holes[i].gross = 1
            }

            pass == true ? (setCurrentPage(currentPage + 1), setPlayerOne(tempPlayerOne)) : alert('Please fill in the form.')
        }
        // User is unable to proceed to the next page unless certain conditions are met.
        if (currentPage == 3) {
            let pass = false
            // sets up a temporary player object that can be modified which is later used to replace the regular player object.
            let tempPlayerTwo = playerTwo
            tempPlayerTwo.name = document.getElementById('gamePlayer2Name').value
            tempPlayerTwo.allowance = document.getElementById('gamePlayer2Handicap').value
            pass = tempPlayerTwo.name == null | tempPlayerTwo.name.length == 0 ? false : true
            if (pass == false) return alert('Please fill in the name field.')
            pass = tempPlayerTwo.allowance == null | tempPlayerTwo.allowance.length == 0 ? false : true

            // Loops through temporary player object setting allowances per hole.
            // Templooper is used to reset the index number if hole length is less than allowance number,
            let tempLooper = 0
            tempPlayerTwo.holes = JSON.parse(JSON.stringify(currentCourse.holes));
            if (tempPlayerTwo.allowance > 0) {
                // Sort by stroke index in order to prioritize allowance to most difficult holes.
                tempPlayerTwo.holes.sort((a, b) => (a.strokeIndex > b.strokeIndex) ? 1 : -1)

                for (let i = 0; i < tempPlayerTwo.allowance; i++) {
                    if (i == 18) tempLooper = 18
                    if (i - tempLooper == 18) tempLooper = tempLooper + 18
                    const e = tempPlayerTwo.holes[i - tempLooper];
                    e.allowance = e.allowance == NaN | e.allowance == undefined | e.allowance == null ? 0 : e.allowance
                    e.allowance -= 1
                }

                tempPlayerTwo.holes.sort((a, b) => (a.number > b.number) ? 1 : -1)
            }

            // Loops through holes, verifies that allowance has a value and gross starts at 1.
            for (let i = 0; i < tempPlayerTwo.holes.length; i++) {
                if (tempPlayerTwo.holes[i].allowance == undefined) tempPlayerTwo.holes[i].allowance = 0
                tempPlayerTwo.holes[i].gross = 1
            }

            pass == true ? (setCurrentPage(currentPage + 1), setPlayerTwo(tempPlayerTwo)) : alert('Please fill in the form.')
        }
    }

    // When the gross value is changed during the final step of the game setup, this handles updating the table data.
    // NOTE: different methods used to get elements. Can be optimized, cleaned up.
    const handleGrossChange = (e) => {
        let gross = parseFloat(e.target.value)
        let allowance = parseFloat(e.target.parentNode.parentNode.querySelector(`.${e.target.name}.allowance`).innerText)
        let net = e.target.parentNode.parentNode.querySelector(`.${e.target.name}.net`)
        net.innerText = gross + allowance

        if (e.target.name == 'player1') playerOne.holes[e.target.getAttribute('data-index')].gross = gross
        if (e.target.name == 'player2') playerTwo.holes[e.target.getAttribute('data-index')].gross = gross

        let points = e.target.parentNode.parentNode.getElementsByClassName(`point`)
        points[0].className = playerOne.holes[e.target.getAttribute('data-index')].gross == playerTwo.holes[e.target.getAttribute('data-index')].gross ? 'point bg-secondary' : (
            playerOne.holes[e.target.getAttribute('data-index')].gross < playerTwo.holes[e.target.getAttribute('data-index')].gross ? 'point bg-warning' : 'point bg-secondary'
        )
        points[0].innerText = playerOne.holes[e.target.getAttribute('data-index')].gross == playerTwo.holes[e.target.getAttribute('data-index')].gross ? 'T' : (
            playerOne.holes[e.target.getAttribute('data-index')].gross < playerTwo.holes[e.target.getAttribute('data-index')].gross ? 'W' : 'L'
        )
        points[1].className = playerTwo.holes[e.target.getAttribute('data-index')].gross == playerOne.holes[e.target.getAttribute('data-index')].gross ? 'point bg-secondary' : (
            playerTwo.holes[e.target.getAttribute('data-index')].gross < playerOne.holes[e.target.getAttribute('data-index')].gross ? 'point bg-warning' : 'point bg-secondary'
        )
        points[1].innerText = playerTwo.holes[e.target.getAttribute('data-index')].gross == playerOne.holes[e.target.getAttribute('data-index')].gross ? 'T' : (
            playerTwo.holes[e.target.getAttribute('data-index')].gross < playerOne.holes[e.target.getAttribute('data-index')].gross ? 'W' : 'L'
        )
    }

    // Thie component allows user to select the course in which they will be playing.
    const CreatePage1 = () => {

        // Click event to set the current course.
        const handleSetCourse = (e) => {
            e.preventDefault()
            e.target.value == 'PGA_Frisco_East' ? setCurrentCourse(PGA_Frisco_East) : null
        }

        // Renders table containing data from the selected course.
        return (
            <Fragment>
                <h5 className="modal-title mb-3" id="exampleModalLabel">Step 1. Select Course</h5>
                <div className="mb-3">
                    <select className="form-select" aria-label="Default select example" onChange={handleSetCourse}>
                        {currentCourse == null ? (
                            <option className="hide" value="None" selected disabled>Select Course</option>
                        ) : null}
                        <option value="PGA_Frisco_East">PGA Frisco East</option>
                    </select>
                </div>
                <div id="courseData">
                    {/* Prevent course table from loading if course is not set. */}
                    {currentCourse == null ? null : (
                        <Fragment>
                            <h5>{currentCourse.name}</h5>
                            <p>{currentCourse.adress}</p>
                            <table className='table table-dark'>
                                <thead>
                                    <tr>
                                        <th scope="col">Hole #</th>
                                        <th scope="col">Yardage</th>
                                        <th scope="col">Stroke Index</th>
                                        <th scope="col">Par</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        // Loop through holes in the course, display data.
                                        currentCourse.holes.map(hole => (
                                            <tr key={hole.number} className={hole.number == 18 ? 'border-bottom border-white' : ''}>
                                                <td>{hole.number}</td>
                                                <td>{hole.yardage}</td>
                                                <td>{hole.strokeIndex}</td>
                                                <td>{hole.par}</td>
                                            </tr>
                                        ))
                                    }
                                    {/* Calculate and display total values. */}
                                    <tr>
                                        <th>Total</th>
                                        <td>{
                                            currentCourse.holes.reduce(function (total, currentValue) {
                                                return total + currentValue.yardage;
                                            }, 0)
                                        }</td>
                                        <td></td>
                                        <td>{
                                            currentCourse.holes.reduce(function (total, currentValue) {
                                                return total + currentValue.par;
                                            }, 0)
                                        }</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Fragment>
                    )}
                </div>
            </Fragment>
        )
    }

    // This component allows the first player to enter their information, name and handicap.
    // NOTE: value tampering is not prevented by server.
    const CreatePage2 = () => {
        return (
            <Fragment>
                <h5 className="modal-title mb-3" id="exampleModalLabel">Step 2. Player One Details</h5>
                <div className="mb-3">
                    <input type="input" defaultValue={'Player One'} className="form-control primary" id="gamePlayer1Name" aria-describedby="gamePlayer1NameHelp" name="Player1Name" />
                    <div id="gamePlayer1NameHelp" className="form-text">Enter the name of Player One.</div>
                </div>
                <div className="mb-3">
                    <input type="number" defaultValue={0} min={0} max={100} className="form-control primary" id="gamePlayer1Handicap" aria-describedby="gamePlayer1Handicapelp" name="Player1Handicap" />
                    <div id="gamePlayer1HandicapHelp" className="form-text">Enter the handicap of Player One.</div>
                </div>
            </Fragment>
        )
    }

    // This component allows the second player to enter their information, name and handicap.
    // NOTE: value tampering is not prevented by server.
    const CreatePage3 = () => {
        return (
            <Fragment>
                <h5 className="modal-title mb-3" id="exampleModalLabel">Step 3. Player Two Details</h5>
                <div className="mb-3">
                    <input type="input" defaultValue={'Player Two'} className="form-control primary" id="gamePlayer2Name" aria-describedby="gamePlayer2NameHelp" name="Player2Name" />
                    <div id="gamePlayer2NameHelp" className="form-text">Enter the name of Player Two.</div>
                </div>
                <div className="mb-3">
                    <input type="number" defaultValue={0} min={0} max={100} className="form-control primary" id="gamePlayer2Handicap" aria-describedby="gamePlayer2HandicapHelp" name="Player2Handicap" />
                    <div id="gamePlayer2HandicapHelp" className="form-text">Enter the handicap of Player Two.</div>
                </div>
            </Fragment>
        )
    }

    // This component displays the course data and user data.
    // Calculates, on a per hole level, who is winning.
    const CreatePage4 = () => {
        return (
            <Fragment>
                <h5 className="modal-title mb-3" id="exampleModalLabel">Record Game</h5>
                <Fragment>
                    <h5>{currentCourse.name}</h5>
                    <p>{currentCourse.adress}</p>
                    <table className='table table-dark'>
                        <thead>
                            <tr>
                                <th scope="col" className='border-bottom border-white'></th>
                                <th scope="col" className='border-bottom border-white'></th>
                                <th scope="col" className='border-start border-white'>{playerOne.name}</th>
                                <th scope="col" className='border-bottom border-white'></th>
                                <th scope="col" className='border-bottom border-white'></th>
                                <th scope="col" className='border-bottom border-white'></th>
                                <th scope="col" className='border-start border-white'>{playerTwo.name}</th>
                                <th scope="col" className='border-bottom border-white'></th>
                                <th scope="col" className='border-bottom border-white'></th>
                                <th scope="col" className='border-bottom border-white'></th>
                            </tr>
                            <tr>
                                <th scope="col">Hole #</th>
                                <th scope="col">Par</th>
                                <th scope="col" className='border-start border-white'>Allowance</th>
                                <th scope="col">Gross</th>
                                <th scope="col">Net</th>
                                <th scope="col">Point</th>
                                <th scope="col" className='border-start border-white'>Allowance</th>
                                <th scope="col">Gross</th>
                                <th scope="col">Net</th>
                                <th scope="col">Point</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                // Loop through holes in course. Calculates and displays player values and player vs player values.
                                currentCourse.holes.map(hole => (
                                    <tr key={hole.number} className={hole.number == 18 ? 'border-bottom border-white' : ''}>
                                        <td className='border-bottom border-white'>{hole.number}</td>
                                        <td className='border-end border-bottom border-white'>{hole.par}</td>
                                        <td className='player1 allowance' name='player1'>{playerOne.holes[hole.number - 1].allowance}</td>
                                        <td>
                                            <input type="number" name='player1' data-index={hole.number - 1} defaultValue={1} min={1} max={100} onChange={handleGrossChange} className="form-control primary" id={'grossPlayer1Hole' + hole.number} />
                                        </td>
                                        <td className='player1 net' name='player1'>{playerOne.holes[hole.number - 1].allowance + 1}</td>
                                        <td className={'point '+
                                            playerOne.holes[hole.number - 1].allowance + 1 == playerTwo.holes[hole.number - 1].allowance + 1 ? 'point bg-secondary' : (
                                                playerOne.holes[hole.number - 1].allowance + 1 < playerTwo.holes[hole.number - 1].allowance + 1 ? 'point bg-warning' : 'point bg-secondary'
                                            )
                                        }>
                                            {
                                            playerOne.holes[hole.number - 1].allowance + 1 == playerTwo.holes[hole.number - 1].allowance + 1 ? 'T' : (
                                                playerOne.holes[hole.number - 1].allowance + 1 < playerTwo.holes[hole.number - 1].allowance + 1 ? 'W' : 'L'
                                            )
                                            }
                                        </td>
                                        <td className='player2 allowance' name='player2'>{playerTwo.holes[hole.number - 1].allowance}</td>
                                        <td>
                                            <input type="number" name='player2' data-index={hole.number - 1} defaultValue={1} min={1} max={100} onChange={handleGrossChange} className="form-control primary" id={'grossPlayer2Hole' + hole.number} />
                                        </td>
                                        <td className='player2 net' name='player2'>{playerTwo.holes[hole.number - 1].allowance + 1}</td>
                                        <td className={
                                            playerTwo.holes[hole.number - 1].allowance + 1 == playerOne.holes[hole.number - 1].allowance + 1 ? 'point bg-secondary' : (
                                                playerTwo.holes[hole.number - 1].allowance + 1 < playerOne.holes[hole.number - 1].allowance + 1 ? 'point bg-warning' : 'point bg-secondary'
                                            )
                                        }>
                                            {
                                            playerTwo.holes[hole.number - 1].allowance + 1 == playerOne.holes[hole.number - 1].allowance + 1 ? 'T' : (
                                                playerTwo.holes[hole.number - 1].allowance + 1 < playerOne.holes[hole.number - 1].allowance + 1 ? 'W' : 'L'
                                            )
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                            <tr>
                                {/* Displays total values. */}
                                <th>Total</th>
                                <td>{
                                    currentCourse.holes.reduce(function (total, currentValue) {
                                        return total + currentValue.par;
                                    }, 0)
                                }</td>
                            </tr>
                        </tbody>
                    </table>
                </Fragment>
            </Fragment>
        )
    }

    // Handles this submition of the game. This will lock and finalize the score. Winner will be declared!
    const handleSubmit = (e) => {
        e.preventDefault();
        // Set 'POST' body data.
        let courseName = currentCourse.name
        let player1 = {
            name: playerOne.name,
            allowance: playerOne.allowance,
            holes: playerOne.holes
        }
        let player2 = {
            name: playerTwo.name,
            allowance: playerTwo.allowance,
            holes: playerTwo.holes
        }
        const url = "scorecards/new";
        const body = {
            courseName: courseName,
            playerOneB: player1,
            playerTwoB: player2
        };

        // POSTs newly created game.
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            }).then((data) => {

                // Reloads all of the scorecards.
                const url = "/scorecards/all_scorecards.json";
                fetch(url)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error("Network response was not ok.");
                    }).then(
                        (scorecardsData) => {
                            // Closes current modal, displays newly locked game/scorecard.
                            setScorecards(scorecardsData)
                            bootstrap.Modal.getInstance(document.getElementById('newGameModal')).hide()
                            document.querySelector(`[data-bs-target="#gameModal${data.id-1}"]`).click()
                        }
                    )

                // Resets new game modal.
                setCurrentPage(1)
                setCurrentCourse(null)
            })
            .catch(error => console.log(error.message));
    }

    // Renders main component.
    return (
        <Fragment>
            <button type="button" className="btn btn-sm secondary" data-bs-toggle="modal" data-bs-target="#newGameModal">New Game</button>

            <div className="modal fade" id="newGameModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className={`${currentPage == 4 ? 'modal-xl' : ''} modal-dialog modal-dialog-scrollable`}>
                    <div className="modal-content primary-dark">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New Game</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                {currentPage == 1 ? <CreatePage1 /> : null}
                                {currentPage == 2 ? <CreatePage2 /> : null}
                                {currentPage == 3 ? <CreatePage3 /> : null}
                                {currentPage == 4 ? <CreatePage4 /> : null}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-sm bg-warning" data-bs-dismiss="modal">Close</button>
                                {currentPage !== 4 && currentCourse !== null ? (
                                    <button type="button" className="btn btn-sm secondary" onClick={nextPage}>Continue</button>
                                ) : (
                                    currentPage !== 4 ? <button type="button" className="btn btn-sm secondary disabled" disabled>Continue</button> : null)
                                }
                                {currentPage == 4 ? (
                                    <button type="submit" className="btn btn-sm secondary">Submit</button>
                                ) : null}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>

    )

}

export default NewGame;