import React, { useState, Fragment } from 'react';

// Component renders buttons and modals that allow users to view the previously played games.
const PreviousGames = ({ scorecards }) => {

    // Ensure that scorecards are loaded before proceeding.
    return scorecards == undefined ? null : (
        <div>
            <p className='lead'>Previous Games</p>
            <ol>
                {/* Loop through all of the scorecards loaded, initialize player stats. */}
                {Object.keys(scorecards).map((game, i) => {

                    let player1 = scorecards[game].player1
                    player1.grossTotal = 0
                    player1.allowanceTotal = 0
                    player1.netTotal = 0
                    player1.pointTotal = 0

                    let player2 = scorecards[game].player2
                    player2.grossTotal = 0
                    player2.allowanceTotal = 0
                    player2.netTotal = 0
                    player2.pointTotal = 0

                    return (
                        <Fragment key={i}>
                            <li>
                                <button type="button" className={'btn btn-sm secondary m-2'} data-bs-toggle="modal" data-bs-target={`#gameModal${i}`} key={i}>{player1.name} vs {player2.name}</button>
                            </li>
                            <div className="modal fade" id={`gameModal${i}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-xl">
                                    <div className="modal-content primary-dark">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">{player1.name} vs {player2.name}</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                        </div>
                                        <form disabled>
                                            <div className="modal-body row">
                                                <p>{scorecards[game].courseName}</p>
                                                <div className='col-xs-12 col-6'>
                                                    <h5 className="form-label mb-4">Player 1 - {player1.name}</h5>
                                                    <table className="table table-dark">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Hole #</th>
                                                                <th scope="col">Gross</th>
                                                                <th scope="col">Allowance</th>
                                                                <th scope="col">Net</th>
                                                                <th scope="col">Point</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {/* Loop through the holes the player has played in. Determine if player has won a point
                                                            in that hole. Sum total values. */}
                                                            {
                                                                player1.holes.map((hole, index) => {
                                                                    hole.net = hole.gross + hole.allowance
                                                                    let player2Net = player2.holes[index].gross + player2.holes[index].allowance

                                                                    let pointColor = 'bg-secondary'
                                                                    hole.status = 'T'
                                                                    if (hole.net > player2Net) {
                                                                        hole.status = 'L';
                                                                        player2.pointTotal++
                                                                    }
                                                                    if (hole.net < player2Net) {
                                                                        hole.status = 'W';
                                                                        pointColor = 'bg-warning'
                                                                        player1.pointTotal++
                                                                    }

                                                                    player1.grossTotal += hole.gross
                                                                    player1.allowanceTotal += hole.allowance
                                                                    player1.netTotal += hole.net

                                                                    // Display hole values inside table element.
                                                                    return (
                                                                        <tr key={index} className={index == 17 ? 'border-bottom border-white' : ''}>
                                                                            <th scope="row">{hole.number}</th>
                                                                            <td>{hole.gross}</td>
                                                                            <td>{hole.allowance}</td>
                                                                            <td>{hole.net}</td>
                                                                            <td className={`${pointColor}`}><span>{hole.status}</span></td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                            {/* Display total values at the bottom of the table element. */}
                                                            <tr>
                                                                <th scope="row">Total</th>
                                                                <td>{player1.grossTotal}</td>
                                                                <td>{player1.allowanceTotal}</td>
                                                                <td>{player1.netTotal}</td>
                                                                <th><span>{player1.pointTotal}</span></th>
                                                            </tr>
                                                            <tr>
                                                                {/* Determine and render win/loss status for player. */}
                                                                <th className={`${player1.pointTotal < player2.pointTotal | player1.pointTotal == player2.pointTotal ? 'bg-secondary' : 'bg-warning'}`}>
                                                                    {
                                                                        player1.pointTotal == player2.pointTotal ? (
                                                                            <span>TIE</span>
                                                                        ) : (
                                                                            <span>{player1.pointTotal < player2.pointTotal ? 'LOSE' : 'WIN'}'</span>
                                                                        )
                                                                    }
                                                                </th>
                                                                <th className={`${player1.pointTotal < player2.pointTotal | player1.pointTotal == player2.pointTotal ? 'bg-secondary' : 'bg-warning'}`}></th>
                                                                <th className={`${player1.pointTotal < player2.pointTotal | player1.pointTotal == player2.pointTotal ? 'bg-secondary' : 'bg-warning'}`}></th>
                                                                <th className={`${player1.pointTotal < player2.pointTotal | player1.pointTotal == player2.pointTotal ? 'bg-secondary' : 'bg-warning'}`}></th>
                                                                <th className={`${player1.pointTotal < player2.pointTotal | player1.pointTotal == player2.pointTotal ? 'bg-secondary' : 'bg-warning'}`}></th>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div className='col-xs-12 col-6 border-start border-white'>
                                                    <h5 className="form-label mb-4">Player 2 - {player2.name}</h5>
                                                    <table className="table table-dark">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Hole #</th>
                                                                <th scope="col">Gross</th>
                                                                <th scope="col">Allowance</th>
                                                                <th scope="col">Net</th>
                                                                <th scope="col">Point</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {/* Loop through the holes the player has played in. Determine if player has won a point
                                                            in that hole. Sum total values. */}
                                                            {
                                                                player2.holes.map((hole, index) => {
                                                                    hole.net = hole.gross + hole.allowance
                                                                    let player1Net = player1.holes[index].gross + player1.holes[index].allowance

                                                                    let pointColor = 'bg-secondary'
                                                                    hole.status = 'T'
                                                                    if (hole.net > player1Net) {
                                                                        hole.status = 'L';
                                                                    }
                                                                    if (hole.net < player1Net) {
                                                                        hole.status = 'W';
                                                                        pointColor = 'bg-warning';
                                                                    }

                                                                    player2.grossTotal += hole.gross
                                                                    player2.allowanceTotal += hole.allowance
                                                                    player2.netTotal += hole.net

                                                                    // Display hole values inside table element.
                                                                    return (
                                                                        <tr key={index} className={index == 17 ? 'border-bottom border-white' : ''}>
                                                                            <th scope="row">{hole.number}</th>
                                                                            <td>{hole.gross}</td>
                                                                            <td>{hole.allowance}</td>
                                                                            <td>{hole.net}</td>
                                                                            <td className={`${pointColor}`}><span>{hole.status}</span></td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                            {/* Display total values at the bottom of the table element. */}
                                                            <tr>
                                                                <th scope="row">Total</th>
                                                                <td>{player2.grossTotal}</td>
                                                                <td>{player2.allowanceTotal}</td>
                                                                <td>{player2.netTotal}</td>
                                                                <th><span>{player2.pointTotal}</span></th>
                                                            </tr>
                                                            <tr>
                                                                {/* Determine and render win/loss status for player. */}
                                                                <th className={`${player2.pointTotal < player1.pointTotal | player1.pointTotal == player2.pointTotal ? 'bg-secondary' : 'bg-warning'}`}>
                                                                    {
                                                                        player2.pointTotal == player1.pointTotal ? (
                                                                            <span>TIE</span>
                                                                        ) : (
                                                                            <span>{player2.pointTotal < player1.pointTotal ? 'LOSE' : 'WIN'}'</span>
                                                                        )
                                                                    }
                                                                </th>
                                                                <th className={`${player2.pointTotal < player1.pointTotal | player1.pointTotal == player2.pointTotal ? 'bg-secondary' : 'bg-warning'}`}></th>
                                                                <th className={`${player2.pointTotal < player1.pointTotal | player1.pointTotal == player2.pointTotal ? 'bg-secondary' : 'bg-warning'}`}></th>
                                                                <th className={`${player2.pointTotal < player1.pointTotal | player1.pointTotal == player2.pointTotal ? 'bg-secondary' : 'bg-warning'}`}></th>
                                                                <th className={`${player2.pointTotal < player1.pointTotal | player1.pointTotal == player2.pointTotal ? 'bg-secondary' : 'bg-warning'}`}></th>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-sm bg-warning" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )

                })}
            </ol>
        </div>
    )

};

export default PreviousGames;